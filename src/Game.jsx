import { useState, useEffect, useRef } from "react";
import './game.css';
import Button from "./Components/Button/Button";
import List from "./Components/List/List";

const Game = () => {
    const [numbers, setNumbers] = useState([]);
    const [checks, setChecks] = useState([]);

    const [isCorrect, setIsCorrect] = useState(false);
    const [remarks, setRemarks] = useState('Check your answer 👀');

    const dragItem = useRef();
    const dragOverItem = useRef();
    const dragCheck = useRef();

    const sortedNumbers = checks.slice().sort((a, b) => a - b);

    // const onlyNumbers = (array) => {
    //     return array.every(element => {
    //         return typeof element === 'number';
    //     });
    // }

    const generateNumbers = () => {
        const randomNumbers = Array(5).fill().map(() => Math.round(Math.random() * 1000));
        return randomNumbers;
    };

    const generateChecks = () => {
        const randomChecks = Array(5).fill(0).map(() => 'Drop');
        return randomChecks;
    };

    useEffect(() => {
        generateNumbers()
        generateChecks()
        setNumbers(generateNumbers());
        setChecks(generateChecks());
    }, []);

    const handleDragStart = (e, index) => {
        dragItem.current = index;
        e.dataTransfer.setData("type", e.target.tagName);
    }

    const handleDragEnter = (index) => {
        dragOverItem.current = index
    }

    const handleDragEnd = (e) => {
        if (e.target.tagName === 'LI') {
            const newNumbers = [...numbers];
            const dragbox = newNumbers[dragItem.current]
            newNumbers.splice(dragItem.current, 1);
            newNumbers.splice(dragOverItem.current, 0, dragbox)
            // dragItem.current = null;
            dragOverItem.current = null;
            setNumbers(newNumbers);
        }
        else {
            const newChecks = [...checks];
            const dragbox = newChecks[dragItem.current];
            newChecks.splice(dragItem.current, 1)
            newChecks.splice(dragOverItem.current, 0, dragbox)
            dragItem.current = null;
            dragOverItem.current = null;
            setChecks(newChecks)
        }
    }

    const handleDragOver = (e, index) => {
        e.preventDefault();
        dragCheck.current = index
        console.log('dragging')
        // if (e.target.innerText !== 'Drop') {
        //     e.target.style.cursor = "no-move";
        // }
    }

    const handleDrop = (e) => {
        // e.preventDefault();
        let contentType = e.dataTransfer.getData("type");
        console.log(contentType)
        const newChecks = [...checks];
        const dragbox = contentType === 'LI' && numbers[dragItem.current];
        console.log();
        // e.target.innerText !== 'Drop' ? e.target.setAttribute('draggable', 'false') : null;
        console.log(e.target.getAttribute('draggable'));
        if (dragbox && e.target.innerText === 'Drop') {
            contentType === 'LI' && numbers.splice(dragItem.current, 1);
            newChecks.splice(dragCheck.current, 1);
            newChecks.splice(dragCheck.current, 0, dragbox)
            // dragItem.current = null;
            dragCheck.current = null;
            setChecks(newChecks);
        }
        console.log('dropped')
        // else {
        //     dragItem.current = null;
        //     dragCheck.current = null;
        // }
    }

    const handleReset = () => {
        setNumbers(generateNumbers());
        setChecks(generateChecks());
        setIsCorrect(false);
        setRemarks('Check your answer 👀');

    }

    useEffect(() => {
        const answer = checks.includes('Drop') ? false : sortedNumbers.toString() === checks.toString();
        setIsCorrect(answer);
    }, [checks])

    const checkAnswer = () => {
        console.log(sortedNumbers, numbers, checks)
        console.log(sortedNumbers.toString() === numbers.toString())
        console.log(isCorrect)
        setRemarks(isCorrect ? 'Correct ✅' : 'Not Correct ❌');
    };


    return (
        <div className="container">
            <h1 className="main-heading">Sort the numbers in Ascending Order</h1>
            <div className="watermark">
                <div className="watermark__inner">
                    <div className="watermark__body">Drag&Drop</div>
                </div>
            </div>
            <div className="game-wrapper">
                <div className="orderCheckContainer">
                    {checks.map((checks, index) => (
                        <div
                            key={index}
                            draggable
                            className="orderCheckItems"
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e)}

                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={(e) => handleDragEnd(e)}
                        >
                            {checks}
                        </div>
                    ))}
                </div>
                <ul className="list-container">
                    {numbers.map((number, index) => (
                        <List
                            key={number}
                            id={number}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={(e) => handleDragEnd(e)}
                        >
                            {number}
                        </List>
                    ))}
                </ul>
                <div className="controls">
                    <div className="remark">
                        {<p>{remarks}</p>}
                    </div>
                    <div className="btn-controls">
                        <Button onClick={checkAnswer}>Check Answer</Button>
                        <Button onClick={handleReset}>Reset Game</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
