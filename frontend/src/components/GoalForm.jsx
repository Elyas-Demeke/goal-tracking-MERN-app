import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGoal } from "../features/goals/goalSlice";
import {toast} from 'react-toastify'

function GoalForm() {
    const [text, setText] = useState("")
        
    const dispatch = useDispatch()
    
    const {goals, isError, isSuccess, isLoading, message} = useSelector(state => state.goals)

    const onSubmit = (e) => {
        e.preventDefault()
        
        if(!text) toast.error("Add a goal")
        else dispatch(addGoal({text}))
    }
  return <section className="form">
    <form onSubmit={onSubmit}>
        <div className="form-group">
            <input type="text" name="text" id="text" placeholder="Add your goals" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-block">
                Add Goal
            </button>
        </div>
    </form>
  </section>
}
export default GoalForm;
