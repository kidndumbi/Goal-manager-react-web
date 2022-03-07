import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { EditModal } from "./EditModal";
// import configureStore from "redux-mock-store"
import { store } from "../../store";

describe("EditModal", () => {
  const dataToEdit = {
    data: {
      id: "622405f95bb76617e9baae0f",
      name: "5 day fast Let's go!",
      status: "IN_PROGRESS",
      createDate: 1646527993528,
      dueDate: 1646959920000,
      failDate: null,
      objectives: [
        {
          id: "789b46ed-9b1e-407c-b40b-350be14c60a2",
          name: "Day 1",
          status: "IN_PROGRESS",
          createDate: 1646594075784,
          dueDate: 1646614320000,
          markedForDeletion: false,
          markedForUpdate: false,
        },
        {
          id: "8b061bd1-09b1-4352-81ba-a88f3ec231d3",
          name: "Day 2",
          status: "IN_PROGRESS",
          createDate: 1646594132922,
          dueDate: 1646700720000,
          markedForDeletion: false,
          markedForUpdate: false,
        },
        {
          id: "0f097320-fc77-4bdd-9206-e787d89e9345",
          name: "Day 3",
          status: "IN_PROGRESS",
          createDate: 1646594132922,
          dueDate: 1646787120000,
          markedForDeletion: false,
          markedForUpdate: false,
        },
        {
          id: "60e2ded4-ff16-4a3f-8edc-7cf2df0cad0e",
          name: "Day 4",
          status: "IN_PROGRESS",
          createDate: 1646594132922,
          dueDate: 1646873520000,
          markedForDeletion: false,
          markedForUpdate: false,
        },
        {
          id: "f1fccb4f-488f-49da-b2cd-d6c337458ccb",
          name: "Day 5",
          status: "IN_PROGRESS",
          createDate: 1646594132922,
          dueDate: 1646959920000,
          markedForDeletion: false,
          markedForUpdate: false,
        },
      ],
      notes: "",
      history: [
        {
          id: "45ad163a-4e3f-4298-86c0-ff0b5dd4a06a",
          createDate: 1646592461797,
          description: "Updated name from 5 day fast to 5 day fast Let's go!",
          fieldName: "name",
        },
      ],
    },
    type: "goalHeaders",
  };

  test("Should display right labels", async () => {
    render(
      <Provider store={store}>
        <EditModal
          showModal={true}
          onCloseModal={function (): void {}}
          onSaveChanges={function (data: any): void {}}
          dataToEdit={dataToEdit}
        ></EditModal>
      </Provider>
    );

    const nameLabel = screen.getByText("Name");
    expect(nameLabel).toBeInTheDocument();
    const dueDateLabel = screen.getByText("Due Date");
    expect(dueDateLabel).toBeInTheDocument();
    const status = screen.getByText("Status");
    expect(status).toBeInTheDocument();
    const createdOn = screen.getByText("Created On:");
    expect(createdOn).toBeInTheDocument();
  });

  test("Should display right control values", async () => {
    render(
      <Provider store={store}>
        <EditModal
          showModal={true}
          onCloseModal={function (): void {}}
          onSaveChanges={function (data: any): void {}}
          dataToEdit={dataToEdit}
        ></EditModal>
      </Provider>
    );

    const nameInput = screen.getByDisplayValue("5 day fast Let's go!");
    expect(nameInput).toHaveAttribute("type", "text");
    const statusInput = screen.getByDisplayValue("In Progress");
    expect((statusInput as HTMLSelectElement).value).toEqual("IN_PROGRESS");
    const dueDateInput = screen.getByDisplayValue("03/10/2022 7:52 PM");
    expect((dueDateInput as HTMLInputElement).value).toEqual(
      "03/10/2022 7:52 PM"
    );

    //(screen as any).debug()
  });

  test("Should not display Data when Showmodal is set to false", () => {
    render(
      <Provider store={store}>
        <EditModal
          showModal={false}
          onCloseModal={function (): void {}}
          onSaveChanges={function (data: any): void {}}
          dataToEdit={dataToEdit}
        ></EditModal>
      </Provider>
    );

    const nameInput = screen.queryByDisplayValue("submit");
    expect(nameInput).toBeNull();
  });

  test("Should hide status if objective is New creation", () => {
    dataToEdit.type = "new-objective";

    render(
      <Provider store={store}>
        <EditModal
          showModal={true}
          onCloseModal={function (): void {}}
          onSaveChanges={function (data: any): void {}}
          dataToEdit={dataToEdit}
        ></EditModal>
      </Provider>
    );

    const statusInput = screen.queryByDisplayValue("In Progress");
    expect(statusInput).toBeNull();
  });

  test("Should trigger save changes", async () => {
    const onSaveChanges = jest.fn();

    render(
      <Provider store={store}>
        <EditModal
          showModal={true}
          onCloseModal={function (): void {}}
          onSaveChanges={onSaveChanges}
          dataToEdit={dataToEdit}
        ></EditModal>
      </Provider>
    );

    const saveChangesBtn = await screen.findByText("Save Changes");
    fireEvent.click(saveChangesBtn);

    await waitFor(() => {
      expect(onSaveChanges).toHaveBeenCalledTimes(1);
    });
  });

  test("Should display required when name text bux is emptied", async () => {
    render(
      <Provider store={store}>
        <EditModal
          showModal={true}
          onCloseModal={function (): void {}}
          onSaveChanges={() => {}}
          dataToEdit={dataToEdit}
        ></EditModal>
      </Provider>
    );

    const nameInput = screen.getByDisplayValue("5 day fast Let's go!");
    fireEvent.change(nameInput, { target: { value: "" } });

    await waitFor(() => {
      expect((nameInput as HTMLInputElement).value).toEqual("");
    });
    await waitFor(() => {
      expect(screen.getByText("Required")).toBeInTheDocument();
    });

    
  });
});
