import { IWorkout } from '../../../models/item'
import './Item.css'

interface WorkoutItemProps {
    item: IWorkout,
    handleEditClick: (e: React.MouseEvent<HTMLElement>) => void,
    handleDeleteClick: (e: React.MouseEvent<HTMLElement>) => void,
}

export default function Item({item, handleEditClick, handleDeleteClick}: WorkoutItemProps) {

    return (
        <li className="item" id={item.id}>
            <span>{item.date}</span>
            <span>{item.distance}</span>
            <div className="buttons">
                <button className="btn edit" onClick={handleEditClick}>
                    &#9998;
                </button>
                &nbsp; &nbsp; &nbsp; 
                <button className="btn delete" onClick={handleDeleteClick}>
                    &#10008;
                </button>
            </div>
        </li>
    );
}