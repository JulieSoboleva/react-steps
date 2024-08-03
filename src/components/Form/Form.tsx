import { useState } from 'react'
import { v4 as uuid4 } from 'uuid'
import getTime from './helpers/getTime'
import { IWorkout } from '../../models/item'
import './Form.css'
import List from '../List/List'

interface IWorkouts {
    list: IWorkout[]
}

export default function Form({ list }: IWorkouts) {
    const [workouts, setWorkouts] = useState(list);
    const [form, setForm] = useState({ date: '', distance: '' });
    const [editingMode, setEditingMode] = useState({ state: false, index: -1 });

    const toggleEditingMode = (index: number) => {
        if (editingMode.state) {
            setEditingMode({ state: false, index: -1 });
        } else {
            setEditingMode({ state: true, index: index });
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let updatedWorkouts: IWorkout[];

        if (editingMode.state) {
            const { index } = editingMode;

            updatedWorkouts = [
                ...workouts.slice(0, index),
                {
                    id: workouts[index].id,
                    date: form.date,
                    distance: form.distance,
                },
                ...workouts.slice(index + 1),
            ];
            toggleEditingMode(-1);
        } else {
            const index = workouts.findIndex(
                (workout) => getTime(workout.date) <= getTime(form.date)
            );
            if (index === -1) {
                updatedWorkouts = [
                    ...workouts.slice(0, workouts.length),
                    {
                        id: uuid4(),
                        date: form.date,
                        distance: form.distance,
                    },
                ];
            } else if (getTime(workouts[index].date) === getTime(form.date)) {
                updatedWorkouts = [
                    ...workouts.slice(0, index),
                    {
                        id: uuid4(),
                        date: workouts[index].date,
                        distance: String(+workouts[index].distance + +form.distance),
                    },
                    ...workouts.slice(index + 1),
                ];
            } else {
                updatedWorkouts = [
                    ...workouts.slice(0, index),
                    {
                        id: uuid4(),
                        date: form.date,
                        distance: form.distance,
                    },
                    ...workouts.slice(index),
                ];
            }
        }
        setWorkouts(updatedWorkouts);
        setForm({ date: '', distance: '' });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }

    const getWorkoutIndex = (target: EventTarget) => {
        const id = ((target as Element)?.closest('.item') as HTMLElement)?.id;
        const index = workouts.findIndex((workout) => workout.id === id);
        return index;
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!e.target) {
            return;
        }
        const index = getWorkoutIndex(e.target);
        const updatedWorkouts = [
            ...workouts.slice(0, index),
            ...workouts.slice(index + 1),
        ];
        setWorkouts(updatedWorkouts);
    }

    const handleEditClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!e.target) {
            return;
        }
        const index = getWorkoutIndex(e.target);
        setForm({ date: workouts[index].date, distance: workouts[index].distance });
        toggleEditingMode(index);
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="date">Дата (ДД.ММ.ГГ)
                <input
                    className="form_date"
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={form.date}
                    onChange={handleInputChange}/>
                </label>
                <label htmlFor="distance">Пройдено км
                <input
                    className="form_distance"
                    type="number"
                    id="distance"
                    name="distance"
                    min="0"
                    pattern="[0-9]+([\.,][0-9]+)?"
                    step="0.1"
                    max="100"
                    required
                    value={form.distance}
                    onChange={handleInputChange}/>
                </label>
                <button className="form_btn-ok" type="submit">OK</button>
            </form>
            <List 
                list={workouts}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}/>
        </>
        
    );
}