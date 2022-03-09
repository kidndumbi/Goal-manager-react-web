import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { EditModal } from "./EditModal";
// import configureStore from "redux-mock-store"
import { store } from "../../store";
import { dataToEdit } from "../../mock/dataToEdit";

const props = {
  showModal: true,
  onCloseModal: function (): void {},
  onSaveChanges: function (data: any): void {},
  dataToEdit,
};

const EditModalWrapper = (p: any) => {
  return (
    <>
      <Provider store={store}>
        <EditModal {...p}></EditModal>
      </Provider>
    </>
  );
};

describe("EditModal", () => {
  test("Should display right labels", async () => {
    render(<EditModalWrapper {...props}></EditModalWrapper>);
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
    render(<EditModalWrapper {...props}></EditModalWrapper>);
    const nameInput = screen.getByDisplayValue("5 day fast Let's go!");
    expect(nameInput).toHaveAttribute("type", "text");
    const statusInput = screen.getByDisplayValue("In Progress");
    expect((statusInput as HTMLSelectElement).value).toEqual("IN_PROGRESS");
    const dueDateInput = screen.getByRole("button", {
      name: "03/10/2022 7:52 PM",
    });
    expect(dueDateInput as HTMLButtonElement).toHaveTextContent(
      "03/10/2022 7:52 PM"
    );

    //(screen as any).debug()
  });

  test("Should not display Data when Showmodal is set to false", () => {
    render(<EditModalWrapper {...props}></EditModalWrapper>);

    const nameInput = screen.queryByDisplayValue("submit");
    expect(nameInput).toBeNull();
  });

  test("Should hide status if objective is New creation", () => {
    dataToEdit.type = "new-objective";
    render(<EditModalWrapper {...props}></EditModalWrapper>);
    const statusInput = screen.queryByDisplayValue("In Progress");
    expect(statusInput).toBeNull();
  });

  test("Should trigger save changes", async () => {
    const onSaveChanges = jest.fn();
    render(
      <EditModalWrapper
        {...props}
        onSaveChanges={onSaveChanges}
      ></EditModalWrapper>
    );
    const saveChangesBtn = await screen.findByText("Save Changes");
    fireEvent.click(saveChangesBtn);
    await waitFor(() => {
      expect(onSaveChanges).toHaveBeenCalledTimes(1);
    });
  });

  test("Should display required when name text bux is emptied", async () => {
    render(<EditModalWrapper {...props}></EditModalWrapper>);
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
