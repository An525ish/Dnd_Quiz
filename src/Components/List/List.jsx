import './style.css'
import { MdDragIndicator } from 'react-icons/md'

const List = ({ children, onDragStart, onDragEnter, onDragEnd }) => {
  return (
    <li className="list-item"
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
    >
      <MdDragIndicator className='icon'/> {children}
    </li>
  )
}

export default List