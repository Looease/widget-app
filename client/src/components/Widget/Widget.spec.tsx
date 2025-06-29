import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Widget from "./Widget";

vi.mock('../../hooks/useGetWidgets/useGetWidgets', async () => {
  return {
    useGetWidgets: vi.fn(() => ({
      data: [],
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

describe("Widget", () => {
  test("should set widget content", async () => {
    render(<Widget widget={null} addWidget={true} handleRefetch={vi.fn()} setAddWidget={vi.fn()}/>);

    const input = screen.getByRole("textbox", { name: "Create" });

    await userEvent.type(input, "Enquiry");

    expect(input).toHaveValue("Enquiry");
  });
});
