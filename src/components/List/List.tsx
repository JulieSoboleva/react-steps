import { IWorkout } from '../../models/item'
import Item from './Item/Item'
import './List.css'

interface IWorkouts {
    list: IWorkout[];
    handleEditClick: (e: React.MouseEvent<HTMLElement>) => void;
    handleDeleteClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function List({ list, handleEditClick, handleDeleteClick }: IWorkouts) {

    return (
        <ul className="list">
            <div>
                <div className="list-header">
                    <span>Дата (ДД.ММ.ГГ)</span>
                    <span>Пройдено км</span>
                    <span>Действия</span>
                </div>
            </div>
            <div className="list-wrap">
                {list.map((workout) => (
                    <Item 
                        key={workout.id}
                        item={workout} 
                        handleEditClick={handleEditClick} 
                        handleDeleteClick={handleDeleteClick}/>
                ))}
            </div>
        </ul>
    );
}