import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Widget from "./Widget";
import type { Widgets } from "../../requests/getWidgets/getWidgets.types";

let data: Widgets | {} = {};
let error: string | null = null;

vi.mock("../../hooks/useGetWidgets/useGetWidgets", async () => {
  return {
    useGetWidgets: vi.fn(() => ({
      data: data,
      loading: false,
      error: null,
      refetchWidgets: vi.fn(),
    })),
  };
});

vi.mock("../../hooks/useCreateWidget/useCreateWidget", async () => {
  return {
    useCreateWidget: vi.fn(() => ({
      data: {},
      loading: false,
      error: error,
      refetchWidgets: vi.fn(),
    })),
  };
});

describe("Widget", () => {
  afterEach(() => {
    vi.clearAllMocks();
    error = null;
  });
  test("should set widget content", async () => {
    render(
      <Widget
        widget={null}
        addWidget={true}
        handleRefetch={vi.fn()}
        setAddWidget={vi.fn()}
      />,
    );

    const input = screen.getByRole("textbox", {
      name: "Create",
    }) as HTMLInputElement;

    await userEvent.type(input, "Enquiry");

    expect(input.value).toBe("Enquiry");
  });
  test("should render saved widget", async () => {
    const widget = {
      id: 1,
      content: "Sales enquiry.",
    };
    render(
      <Widget
        widget={widget}
        addWidget={false}
        handleRefetch={vi.fn()}
        setAddWidget={vi.fn()}
      />,
    );

    expect(screen.getByText("Sales enquiry.")).toBeTruthy();
    expect(screen.queryByRole("textbox", { name: "Create" })).not.toBeTruthy();
  });
  test("should render error widget if error creating widget", async () => {
    error = "Error creating widget";
    render(
      <Widget
        widget={null}
        addWidget={true}
        handleRefetch={vi.fn()}
        setAddWidget={vi.fn()}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Create" });

    await userEvent.type(input, "Enquiry");

    await waitFor(() => {
      expect(
        screen.getByText("Create widget error. Please try again."),
      ).toBeTruthy();
    });
  });
});
