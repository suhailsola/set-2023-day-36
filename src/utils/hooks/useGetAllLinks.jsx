import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAllLinks } from "../api";

const useGetAllLinks = () => {
  const [linkState, setLinkState] = useState("pending");
  const [data, setData] = useState([]);
  const { jwt } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      setLinkState("loading");
      const links = await getAllLinks(jwt);
      // console.log(links.data.data.rows);
      setData(links.data.data.rows);
      setLinkState("success");
    } catch (error) {
      setLinkState("error");
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { linkState, data };
};

export default useGetAllLinks;
