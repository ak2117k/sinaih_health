import { useEffect } from "react";
import { useSelector } from "react-redux";

const useFetch = () => {
  console.log("Running useFetch");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log(user);
  }, [user]);
};
export default useFetch;
