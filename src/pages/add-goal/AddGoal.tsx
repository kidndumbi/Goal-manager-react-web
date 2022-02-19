import { PropsWithChildren, useEffect } from "react"
import { useDispatch } from "react-redux";

interface AddGoalProps {

}

const AddGoal = (props: PropsWithChildren<AddGoalProps>) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "SET_CURRENT_PAGE",
            payload: { currentPage: "AddGoal" },
          });
    }, []);

    return (
        <div>ADD GOAL PAGE</div>
    )

}

export { AddGoal }