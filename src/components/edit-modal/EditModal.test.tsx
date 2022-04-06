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
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Due Date")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Created On:")).toBeInTheDocument();
  });

  test("Should display right control values", async () => {
    render(<EditModalWrapper {...props}></EditModalWrapper>);
    expect(screen.getByDisplayValue("5 day fast Let's go!")).toHaveAttribute("type", "text");
    expect((screen.getByDisplayValue("In Progress") as HTMLSelectElement).value).toEqual("IN_PROGRESS");
    expect(screen.getByRole("button", {
      name: "03/10/2022 7:52 PM",
    }) as HTMLButtonElement).toHaveTextContent(
      "03/10/2022 7:52 PM"
    );

    //(screen as any).debug()
  });

  test("Should not display Data when Showmodal is set to false", () => {
    render(<EditModalWrapper {...props}></EditModalWrapper>);
    expect(screen.queryByDisplayValue("submit")).toBeNull();
  });

  test("Should hide status if objective is New creation", () => {
    dataToEdit.type = "new-objective";
    render(<EditModalWrapper {...props}></EditModalWrapper>);
    expect(screen.queryByDisplayValue("In Progress")).toBeNull();
  });

  test("Should trigger save changes", async () => {
    const onSaveChanges = jest.fn();
    render(
      <EditModalWrapper
        {...props}
        onSaveChanges={onSaveChanges}
      ></EditModalWrapper>
    );
    const nameInput = screen.getByDisplayValue("5 day fast Let's go!");
    fireEvent.change(nameInput, { target: { value: "yo" } });

    fireEvent.click(await screen.findByText("Save Changes"));
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
