import { useEffect } from "react";

let intervalId;

const NestedPage3 = () => {
  useEffect(() => {
    intervalId = setInterval(() => {}, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return <h2>to Tal's Cards</h2>;
};
export default NestedPage3;
