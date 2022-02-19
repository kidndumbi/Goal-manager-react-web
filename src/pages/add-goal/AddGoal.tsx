import { PropsWithChildren, useEffect } from "react"
import { useDispatch } from "react-redux";
import { currentPageActions } from "../../store";

interface AddGoalProps {

}

const AddGoal = (props: PropsWithChildren<AddGoalProps>) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(currentPageActions.setCurrentPage({ currentPage: "AddGoal" }));
    }, []);

    return (
        <div>ADD GOAL PAGE</div>
    )

}

export { AddGoal }