import { PropsWithChildren, useContext, useState } from "react";
import GoalsTabList from "../../components/goals-tabs/GoalsTabList";
import GoalList from "../../components/goals/GoalsList";
import { GoalsContext } from "../../contexts/goals.context";

interface Props {
   searchValue: string;
}

const AllGoals = (props: PropsWithChildren<Props>) => {

    const [selectedGoalType, setSelectedGoalType] = useState('');

    const { goalsData } = useContext<any>(GoalsContext)

    const goalTypeSelectedHandler = (selected: any) => {
       setSelectedGoalType(selected);
    }

    return ( 
        <>
        <GoalsTabList goalsData={goalsData} onGoalTypeSelected={goalTypeSelectedHandler}></GoalsTabList>
        <GoalList goalsData={goalsData} selectedGoalType={selectedGoalType} searchValue={props.searchValue}></GoalList>
        </>
     );
}
 
export default AllGoals;