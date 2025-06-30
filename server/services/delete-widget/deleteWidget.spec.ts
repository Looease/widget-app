import { describe, test, expect, vi, beforeEach } from "vitest";
import { Pool } from "pg";
import { deleteWidget } from "./deleteWidget";

describe("deleteWidget", () => {
  let mockPool: Pool;
  let mockQuery: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockQuery = vi.fn();
    mockPool = { query: mockQuery } as any;
  });

  test("should delete widget and return deleted data", async () => {
    const mockContent = 1;
    const mockInsertedWidget = { id: 1, content: mockContent };

    mockQuery.mockResolvedValueOnce({
      rows: [mockInsertedWidget],
      command: "DELETE",
      rowCount: 1,
      oid: 0,
      fields: [],
    });

    const result = await deleteWidget(mockPool, mockContent);

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith(
      "DELETE FROM widgets WHERE id = $1 RETURNING id",
      [mockContent],
    );

    expect(result).toEqual([mockInsertedWidget]);
  });

  test("should throw an error if the delete fails", async () => {
    const mockContent = 1;
    const mockError = new Error("Internal server error");

    mockQuery.mockRejectedValueOnce(mockError);

    await expect(deleteWidget(mockPool, mockContent)).rejects.toThrow(
      "Internal server error",
    );

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith(
      "DELETE FROM widgets WHERE id = $1 RETURNING id",
      [mockContent],
    );
  });
});
