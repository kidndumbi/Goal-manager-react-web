import { render, screen } from "@testing-library/react";
import { ConfirmModal } from "./ConfirmModal";

describe("ConfirmModal", () => {
  test("Should render ConfirmModal", () => {
    render(
      <ConfirmModal
        showModal={true}
        onCloseModal={function (): void {}}
        onOk={function (data: any): void {}}
        bodytext={"I am the confirm modal"}
      ></ConfirmModal>
    );

    (screen as any).debug();
  });

  test("Should display body text", () => {
    render(
      <ConfirmModal
        showModal={true}
        onCloseModal={function (): void {}}
        onOk={function (data: any): void {}}
        bodytext={"I am the confirm modal"}
      ></ConfirmModal>
    );

    const confirmBody = screen.getByText('I am the confirm modal');
    expect(confirmBody).toBeInTheDocument();

    (screen as any).debug();
  });
});
