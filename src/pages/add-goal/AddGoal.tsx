import { PropsWithChildren, useContext, useEffect } from "react"
import { CurrentPageContext } from "../../contexts/currentPage.context"

interface AddGoalProps {

}

const AddGoal = (props: PropsWithChildren<AddGoalProps>) => {

    const { setCurrentPage } = useContext<any>(CurrentPageContext);

    useEffect(() => {
        setCurrentPage('AddGoal')
    }, []);

    return (
        <div>ADD GOAL PAGE</div>
    )

}

export { AddGoal }