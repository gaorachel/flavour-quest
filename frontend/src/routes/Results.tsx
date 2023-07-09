import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export function Results() {
  const location = useLocation();
  const answer = location.state;

  useEffect(() => {
    axios.post("/api/v1/quest", answer).then((res) => {
      console.log(res);
    });
  }, [answer]);

  return <> xxx </>;
}
