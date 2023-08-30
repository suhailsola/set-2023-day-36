import { useCallback, useState } from "react";
import useGetAllLinks from "./useGetAllLinks";

const useRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { fetchData } = useGetAllLinks();
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);
  return { onRefresh, refreshing };
};

export default useRefresh;
