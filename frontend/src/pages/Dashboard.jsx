import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {getGoals,reset} from '../features/goals/goalSlice'
//componnents
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'
const Dashboard = () => {
  const {user} = useSelector((state)=> state.auth)
  const {goals,isLoading,isError,message,isSuccess,goal} = useSelector((state)=> state.goals)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(isSuccess)
    if(isError){
      console.error(message)
    }
    if(!user){
      navigate('/login')
    }
    if(user.token == null){
      navigate('/login')

    }
    console.log(goals)
    if(user){
      dispatch(getGoals())
    }
    if(user){
    return ()=>{
      dispatch(reset())
    }}
  },[user,navigate,isError,message,dispatch,isSuccess,goal]);

  if(isLoading){ 
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal)=>(
              <GoalItem key={goal._id} goal={goal} bool={false} />
            ))}
          </div>
        ):(<h3> You do not have any goals</h3>)}
      </section>
    </>
  )
}

export default Dashboard