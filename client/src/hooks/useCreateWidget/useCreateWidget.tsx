import { useState, useCallback } from "react";
import { createWidget } from '../../requests/createWidget';
import type { WidgetType } from '../../requests/getWidgets/getWidgets.types';

export const useCreateWidget = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WidgetType | null>(null);

  const createNeWidget = useCallback(async (content: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await createWidget(content);
      setData(result.widget);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createNeWidget, loading, error, data };
};
