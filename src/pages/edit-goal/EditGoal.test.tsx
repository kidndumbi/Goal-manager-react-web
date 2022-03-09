import { render, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import Router, { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import { goalsActions } from "../../store/goals";
import { EditGoal } from "./EditGoal";
import { rest } from "msw";
import { setupServer } from "msw/node";
import goalsMock from "../../mock/goals.json";

const server = setupServer(
  rest.get(
    "https://whispering-headland-62985.herokuapp.com/goals-manager/goals",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(goalsMock));
    }
  )
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

function EditGoalWrapper() {
  const dispatch = useDispatch();
  dispatch(goalsActions.getGoals());
  return <EditGoal />;
}

const setup = () => {
  jest.spyOn(Router, "useNavigate").mockReturnValue((to: any) => {});
  jest
    .spyOn(Router, "useParams")
    .mockReturnValue({ id: "62278dc9d24b5539be2f0bae" });

  render(
    <BrowserRouter>
      <Provider store={store}>
        <EditGoalWrapper></EditGoalWrapper>
      </Provider>
    </BrowserRouter>
  );
};

beforeAll(() => {});

describe("EditGoal Component", () => {
  test("Should render EditGoals component", async () => {
    setup();
    const slice = await screen.findByText("Slice Cassava");
    expect(slice).toBeInTheDocument();
    (screen as any).debug();
  });
});
