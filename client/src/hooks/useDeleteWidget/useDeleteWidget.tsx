import { useState, useCallback } from "react";
import { deleteWidget } from "../../requests/deleteWidget/deleteWidget";
import type { WidgetType } from "../../requests/getWidgets/getWidgets.types";

export const useDeleteWidget = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WidgetType | null>(null);

  const deleteItem = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await deleteWidget(id);
      setData(response);
    } catch (e: unknown) {
      setError((e instanceof Error && e.message) || "error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteItem, loading, error, data };
};
