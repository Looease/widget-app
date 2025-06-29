import { useState, useCallback } from "react";
import { deleteWidget } from "../../requests/deleteWidget/deleteWidget";

interface Widget {
  id: number;
  content: string;
}

interface CreateWidgetResponse {
  message: string;
  widget: Widget;
}

export const useDeleteWidget = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Widget | null>(null);

  const deleteItem = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await deleteWidget(id);
      setData(response);
    } catch (e: any) {
      setError(e.message || "error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteItem, loading, error, data };
};
