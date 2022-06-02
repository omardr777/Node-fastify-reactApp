import { useDispatch } from 'react-redux'
import { deleteGoal,updateGoal } from '../features/goals/goalSlice'
import {FaEdit} from 'react-icons/fa'
import {AiOutlineClose,AiFillDelete,AiOutlineCheck} from 'react-icons/ai'
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'


const GoalItem = ({ goal, bool }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit,setEdit] = useState(false);
  const [text,setText] = useState('');
  const [date,setDate] = useState('');
  const [done,setDone] = useState(bool);
  console.log("bool\n\n",bool,edit)
  useEffect(() => {
    setText(goal.text);
    setDate(goal.date)
    setDone(goal.done)
  },[])

  const onUpdate = () => {
    dispatch(updateGoal({text,date,done,id:goal._id}))
    navigate('/')
  }


  return (
    edit ? (
      <>
        <div className="goal">
          <div className="bts_container">
              <AiOutlineClose onClick ={()=>{
                setEdit(prevState => !prevState)
              }} style={{cursor: 'pointer'}}/>
              <AiOutlineCheck onClick={onUpdate} style={{cursor: 'pointer'}} />
          </div>
          <div className="form-group">
                  <label htmlFor="text">Date</label>
                  <input type="date" name="date" id="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
            </div>
          <div className="form-group">
            <input type="text" value={text} onChange={(e)=>{
              setText(e.target.value)
            }}></input>
          </div>
            <div className="check-container">

            <label htmlFor="check">Finish</label>
            <input type="checkbox" name="check" defaultChecked={goal.done} onChange={(e)=>{setDone(e.target.checked)}} style={{width:'1rem', height:'1rem'}}/>
            </div>

        </div>
    </>
    ) : (
        <>
          <div className="goal">
            <div className="bts_container">
              <AiFillDelete  onClick={() => dispatch(deleteGoal(goal._id))} style={{cursor: 'pointer'}}/> 
              <FaEdit onClick ={()=>{
                setEdit(prevState => !prevState)
              }} style={{cursor: 'pointer'}}/>
            </div>

            <div>
              {goal.date}
            </div>
            <h2 style={{textDecoration: goal.done? 'line-through':''}}>{goal.text}</h2>
        </div>
      </>
    )
  )
}

export default GoalItem