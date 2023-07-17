import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { ResRecipe } from "../type";

export function Results() {
  const location = useLocation();
  const formData = location.state;
  const [results, setResults] = useState<ResRecipe>();

  useEffect(() => {
    axios.post("/api/v1/quest", formData).then((res) => {
      setResults(res.data);
    });
  }, [formData]);

  return (
    <>
      <div> {results?.recipeName} </div>
      <div> {results?.ingredients} </div>
      <div> {results?.instructions} </div>
    </>
  );
}
