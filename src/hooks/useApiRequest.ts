import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

interface RequestProps {
    url: string;
    initialLoading: boolean;
}

interface ResponseProps<T> {
    data: T | undefined,
    error: boolean,
    loading: boolean
    reload(): void
}

export const useApiRequest = <T>({ url, initialLoading }: RequestProps): ResponseProps<T> => {
  // Response state
  const [data, setData] = useState<T>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(initialLoading);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch data from REST API
      const response = await api.get<T>(url);
      setLoading(false);
      setData(response.data);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }, [url, setData, setError, setLoading]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return {
    data,
    loading,
    error,
    reload: fetchData,
  };
};
