import { useState, useCallback } from "react";

interface Widget {
  id: number;
  content: string;
}

interface CreateWidgetResponse {
  message: string;
  widget: Widget;
}

export const useCreateWidget = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Widget | null>(null);

  const createWidget = useCallback(async (content: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch("http://localhost:3000/create-widget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create widget");
      }

      const result: CreateWidgetResponse = await response.json();
      setData(result.widget);
      return result.widget;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createWidget, loading, error, data };
};
