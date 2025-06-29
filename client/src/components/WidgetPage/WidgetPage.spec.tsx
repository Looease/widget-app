import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WidgetPage from "./WidgetPage";

let widgetArray: never[] = []

vi.mock('../../hooks/useGetWidgets/useGetWidgets', async () => {
  return {
    useGetWidgets: vi.fn(() => ({
      data: widgetArray,
      loading: false,
      error: null,
      refetchWidgets: vi.fn(),
    })),
  };
});

vi.mock('../../hooks/useCreateWidget/useCreateWidget', async () => {
  return {
    useCreateWidget: vi.fn(() => ({
      data: {},
      loading: false,
      error: null,
      refetchWidgets: vi.fn(),
    })),
  };
});

describe("Widget page", () => {
  test("should render page with add widget button", () => {
    render(<WidgetPage />);

    const button = screen.getByRole("button", { name: "Add widget" });

    expect(button).toBeTruthy();
  });
  test("should open add a widget on button click", async () => {
    render(<WidgetPage />);

    expect(screen.queryByRole("textarea")).not.toBeTruthy();
    expect(screen.queryByRole("input")).not.toBeTruthy();

    const createbutton = screen.getByRole("button", { name: "Add widget" });

    await userEvent.click(createbutton);

    expect(screen.getByLabelText('Create')).toBeTruthy()

  });
  test("should add a widget on button click", () => {
    render(<WidgetPage />);
  });
  test("When a user is done typing, the text from that widget should be sent to the backend to be stored.", () => {
    render(<WidgetPage />);
  });
  test("If the page is refreshed, the same widgets should be populated with the same text as entered before the page refresh.", () => {
    render(<WidgetPage />);
  });
  test("should handle server errors", () => {
    render(<WidgetPage />);
  });
});
