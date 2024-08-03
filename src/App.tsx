import workouts from './data/data'
import Form from './components/Form/Form'
import './App.css'

export default function App() {

  return (
    <div className='container'>
      <Form list={workouts}/>
    </div>
  )
}