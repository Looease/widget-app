import { describe, test, expect, vi, beforeEach } from "vitest";
import { Pool } from "pg";
import { getWidgets } from "./getWidgets";

describe("getWidgets", () => {
  let mockPool: Pool;
  let mockQuery: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockQuery = vi.fn();
    mockPool = { query: mockQuery } as any;
  });

  const mockInsertedWidget = { id: 1, content: "Enquiry" };

  test("should getWidges", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [mockInsertedWidget],
      command: "SELECT",
      rowCount: 1,
      oid: 0,
      fields: [],
    });

    const result = await getWidgets(mockPool);

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM widgets");

    expect(result).toEqual([mockInsertedWidget]);
  });
  test("should throw an error if getting widgets fails", async () => {
    const mockError = new Error("Internal server error");

    mockQuery.mockRejectedValueOnce(mockError);

    await expect(getWidgets(mockPool)).rejects.toThrow("Internal server error");

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM widgets");
  });
});
