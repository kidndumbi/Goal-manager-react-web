import { render, screen, waitFor } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import Router, { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import { goalsActions } from "../../store/goals";
import { EditGoal } from "./EditGoal";
import { rest } from "msw";
import { setupServer } from "msw/node";
import goalsMock from "../../mock/goals.json";
import userEvent from "@testing-library/user-event";

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

const setup = (id?: string) => {
  jest.spyOn(Router, "useNavigate").mockReturnValue((to: any) => {});
  jest.spyOn(Router, "useParams").mockReturnValue({ id });

  render(
    <BrowserRouter>
      <Provider store={store}>
        <EditGoalWrapper></EditGoalWrapper>
      </Provider>
    </BrowserRouter>
  );
};

describe("EditGoal Component", () => {
  test("Should render EditGoals component", async () => {
    setup("62278dc9d24b5539be2f0bae");
    const slice = await screen.findByText("Slice Cassava");
    expect(slice).toBeInTheDocument();
  });

  test("Should Have back button", async () => {
    setup("62278dc9d24b5539be2f0bae");
    const backButton = await screen.findByRole("button", { name: "Back" });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveClass("btn btn-outline-primary");
    expect(backButton).toContainHTML('<i class="bi bi-arrow-left-circle-fill" />');
  });

  test("Should Have Delete Goal button", async () => {
    setup("62278dc9d24b5539be2f0bae");
    expect(
      await screen.findByRole("button", { name: "delete goal" })
    ).toBeInTheDocument();
  });

  test("Should Have Edit Goal button", async () => {
    setup("62278dc9d24b5539be2f0bae");
    expect(
      await screen.findByRole("button", { name: "Edit Goal" })
    ).toBeInTheDocument();
  });

  test("Should Have the right data displayed", async () => {
    setup("62278dc9d24b5539be2f0bae");
    expect(
      await screen.findByText("Thursday 24th March 2022 12:09 PM")
    ).toBeInTheDocument();
    expect((await screen.findAllByText("In Progress")).length).toBe(2);
    expect(
      (await screen.findAllByText("Tuesday 8th March 2022 12:09 PM")).length
    ).toBe(3);
  });

  test("Should Have Objectives title", async () => {
    setup("62278dc9d24b5539be2f0bae");
    expect(await screen.findByText("Objectives")).toBeInTheDocument();
  });

  test("Should Have the expected objective and data", async () => {
    setup("6079ff699c9fb9799056caa5");
    const objective = await screen.findByText("Print necessarily documents");
    expect(objective).toBeInTheDocument();
    const dueDate = await screen.findByText("Saturday 1st May 2021 11:30 AM");
    expect(dueDate).toBeInTheDocument();
    const createDate = await screen.findByText(
      "Friday 30th April 2021 9:10 AM"
    );
    const status = await screen.findByText("Complete");
    expect(createDate).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });

  test("Should Open modal on button click add new objective", async () => {
    setup("6079ff699c9fb9799056caa5");
    const addObjectiveBtn = await screen.findByRole("button", {
      name: "add new objective",
    });
    userEvent.click(addObjectiveBtn);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      (screen as any).debug();
    });
  });

  test("Should Close modal on cancel modal button click", async () => {
    setup("6079ff699c9fb9799056caa5");
    const addObjectiveBtn = await screen.findByRole("button", {
      name: "add new objective",
    });
    userEvent.click(addObjectiveBtn);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const modalCloseBtn = await screen.findByRole("button", {
      name: "Close",
    });
    userEvent.click(modalCloseBtn);
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    (screen as any).debug();
  });
});
