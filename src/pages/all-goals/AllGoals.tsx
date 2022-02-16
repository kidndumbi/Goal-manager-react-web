import { PropsWithChildren, useContext, useState } from "react";
import GoalsTabList from "../../components/goals-tabs/GoalsTabList";
import GoalList from "../../components/goals/GoalsList";
import { GoalsContext } from "../../contexts/goals.context";

interface Props {
   
}

const AllGoals = (props: PropsWithChildren<Props>) => {

    const [selectedGoalType, setSelectedGoalType] = useState('');

    const goalTypeSelectedHandler = (selected: any) => {
       setSelectedGoalType(selected);
    }

    return ( 
        <>
        <GoalsTabList onGoalTypeSelected={goalTypeSelectedHandler}></GoalsTabList>
        <GoalList selectedGoalType={selectedGoalType} ></GoalList>
        </>
     );
}
 
export default AllGoals;