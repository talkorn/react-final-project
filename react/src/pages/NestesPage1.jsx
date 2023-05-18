import { useEffect } from "react";

let intervalId;

const NestedPage1 = () => {
  useEffect(() => {
    intervalId = setInterval(() => {}, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return <h2>Hello</h2>;
};
export default NestedPage1;
