import { describe, test, expect, vi, beforeEach } from "vitest";
import { Pool } from "pg";
import { createWidget } from "./createWidget";

describe("createWidget", () => {
  let mockPool: Pool;
  let mockQuery: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockQuery = vi.fn();
    mockPool = { query: mockQuery } as any;
  });

  test("should insert a new widget and return its data", async () => {
    const mockContent = "Enquiry";
    const mockInsertedWidget = { id: 1, content: mockContent };

    mockQuery.mockResolvedValueOnce({
      rows: [mockInsertedWidget],
      command: "INSERT",
      rowCount: 1,
      oid: 0,
      fields: [],
    });

    const result = await createWidget(mockPool, mockContent);

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith(
      "INSERT INTO widgets(content) VALUES ($1) RETURNING id, content",
      [mockContent],
    );

    expect(result).toEqual(mockInsertedWidget);
  });

  test("should throw an error if the database query fails", async () => {
    const mockContent = "Content that causes error";
    const mockError = new Error("Internal server error");

    mockQuery.mockRejectedValueOnce(mockError);

    await expect(createWidget(mockPool, mockContent)).rejects.toThrow(
      "Internal server error",
    );

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith(
      "INSERT INTO widgets(content) VALUES ($1) RETURNING id, content",
      [mockContent],
    );
  });
});
