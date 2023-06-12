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

    const generateNumbers = () => {
        const randomNumbers = Array(5).fill().map(() => Math.round(Math.random() * 1000));
        return randomNumbers;
    };

    const generateChecks = () => {
        const randomChecks = Array(5).fill(0).map(() => null);
        return randomChecks;
    };

    useEffect(() => {
        generateNumbers()
        generateChecks()
        setNumbers(generateNumbers());
        setChecks(generateChecks());
    }, []);

    const handleDragEnd = () => {
        const newNumbers = [...numbers];
        const dragbox = newNumbers[dragItem.current]
        newNumbers.splice(dragItem.current, 1);
        newNumbers.splice(dragOverItem.current, 0, dragbox)
        dragItem.current = null;
        dragOverItem.current = null;
        setNumbers(newNumbers);
    }

    const handleDragStart = (e, index) => {
        dragItem.current = index;
        // e.dataTransfer.setData('id', index);
    }

    // const handleDragEnter = (index) => {
    //     dragOverItem.current = index;
    //     const newNumbers = [...numbers];
    //     newNumbers.splice(dragItem.current, 1);
    //     setNumbers(newNumbers);
    // }

    const handleDragOver = (e, index) => {
        e.preventDefault();
        dragCheck.current = index
        console.log('dragging')
    }

    const handleDrop = (e) => {
        console.log('dropped')
        // const dataId = e.dataTransfer.getData('id');
        // console.log(dataId)
        const newChecks = [...checks];
        const dragbox = numbers[dragItem.current]
        if (dragbox) {
            numbers.splice(dragItem.current, 1);
            newChecks.splice(dragCheck.current, 1);
            newChecks.splice(dragCheck.current, 0, dragbox)
            // dragItem.current = null;
            // dragOverItem.current = null;
            setChecks(newChecks);
        }
    }

    const handleReset = () => {
        setNumbers(generateNumbers());
        setChecks(generateChecks());
        setIsCorrect(false);
        setRemarks('Check your answer 👀');

    }

    useEffect(() => {
        const answer = checks.includes(null) ? false : sortedNumbers.toString() === checks.toString();
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
            <div className="game-wrapper">
                <div className="orderCheckContainer">
                    {checks.map((checks, index) => (
                        <div
                            key={index}
                            draggable
                            className="orderCheckItems"
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e)}
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
                            // onDragEnter={()=>handleDragEnter(index)}
                            onDragEnter={() => dragOverItem.current = index}
                            onDragEnd={handleDragEnd}
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
