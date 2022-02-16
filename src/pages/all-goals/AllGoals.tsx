import { useState } from "react";
import GoalsTabList from "../../components/goals-tabs/GoalsTabList";
import GoalList from "../../components/goals/GoalsList";

const AllGoals = (props: any) => {

    const [selectedGoalType, setSelectedGoalType] = useState('');

    const goalTypeSelectedHandler = (selected: any) => {
       setSelectedGoalType(selected);
    }

    return ( 
        <>
        <GoalsTabList goalsData={props.goalsData} onGoalTypeSelected={goalTypeSelectedHandler}></GoalsTabList>
        <GoalList goalsData={props.goalsData} selectedGoalType={selectedGoalType} searchValue={props.searchValue}></GoalList>
        </>
     );
}
 
export default AllGoals;