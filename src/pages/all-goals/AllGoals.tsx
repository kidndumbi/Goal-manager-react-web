import { PropsWithChildren, useContext, useEffect, useState } from "react";
import GoalsTabList from "../../components/goals-tabs/GoalsTabList";
import GoalList from "../../components/goals/GoalsList";
import { CurrentPageContext } from "../../contexts/currentPage.context";

interface Props {
   searchValue: string;
}
const AllGoals = (props: PropsWithChildren<Props>) => {

    const [selectedGoalType, setSelectedGoalType] = useState('');

    const { setCurrentPage } = useContext<any>(CurrentPageContext);

    useEffect(() => {
        setCurrentPage('MainPage')
    }, []);

    const goalTypeSelectedHandler = (selected: any) => {
       setSelectedGoalType(selected);
    }
    return ( 
        <>
        <GoalsTabList onGoalTypeSelected={goalTypeSelectedHandler}></GoalsTabList>
        <GoalList selectedGoalType={selectedGoalType} searchValue={props.searchValue}></GoalList>
        </>
     );
}
 
export default AllGoals;