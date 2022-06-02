import {useState,useEffect} from 'react'
import {createGoal} from '../features/goals/goalSlice'
import{useDispatch} from 'react-redux'

const GoalForm = () => {
    const dispatch = useDispatch();
    const [text,setText] = useState('')
    const [date,setDate] = useState('');
    const [done,setDone] = useState(false);
    useEffect(()=>{

    },[text])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createGoal({text,date,done}))
        setText('')
        setDate('')
        setDone('')
    }

  return (
    <section className="form">
        <form onSubmit ={ onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Goal</label>
                <input type="text" name="text" id="text" value={text} onChange={(e)=>{setText(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="text">Date</label>
                <input type="date" name="date" id="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-block">Add Goal</button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm