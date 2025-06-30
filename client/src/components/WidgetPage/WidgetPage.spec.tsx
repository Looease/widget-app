import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WidgetPage from "./WidgetPage";
import type { Widgets } from "../../requests/getWidgets/getWidgets.types";

let widgetArray: Widgets = {
  widgets: [
    {
      id: 1,
      content: "Sales enquiry.",
    },
       {
      id: 2,
      content: "Update.",
    },
  ]
}

let error: string | null = null;

vi.mock("../../hooks/useGetWidgets/useGetWidgets", async () => {
  return {
    useGetWidgets: vi.fn(() => ({
      data: widgetArray,
      loading: false,
      error: error,
      refetchWidgets: vi.fn(),
    })),
  };
});

vi.mock("../../hooks/useCreateWidget/useCreateWidget", async () => {
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
  afterEach(() => {
    vi.clearAllMocks();
    error = null;
  });
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

    expect(screen.getByLabelText("Create")).toBeTruthy();
  });
 
  test("If the page is refreshed, the same widgets should be populated with the same text as entered before the page refresh.", async () => {
    render(<WidgetPage />);

    expect(screen.getByText('Sales enquiry.')).toBeTruthy();
    expect(screen.getByText('Update.')).toBeTruthy();


    window.location.reload();

    await waitFor(() =>{
      expect(screen.getByText('Sales enquiry.')).toBeTruthy();
      expect(screen.getByText('Update.')).toBeTruthy();
    })

  });
  test("should handle server errors", () => {
    error = 'Error getting widgets'
    render(<WidgetPage />);

    expect(screen.getByText('Error loading widgets.')).toBeTruthy();
  });
});
