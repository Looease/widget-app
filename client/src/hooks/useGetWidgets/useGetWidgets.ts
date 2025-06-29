import { useState, useEffect, useCallback } from "react";
import { getWidgets } from "../../requests/getWidgets/getWidgets";
import type { Widgets } from '../../requests/getWidgets/getWidgets.types'

const initialState = {
  widgets: [
    {id: 0, content: ''}
  ]
}

export const useGetWidgets = () => {
  const [data, setData] = useState<Widgets>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWidgets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getWidgets();
      setData(result);
    } catch (err: any) {
      setError(err.message || "error");
      setData(initialState);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWidgets();
  }, [fetchWidgets]);

  return { data, loading, error, refetchWidgets: fetchWidgets };
};
