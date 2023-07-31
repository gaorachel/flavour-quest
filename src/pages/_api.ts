import { Choices, ResultsRes } from "@/type";
import axios from "axios";

export const sendAPIReq = async (answers: Choices | Choices) => {
  const res = await axios.post<ResultsRes>("/api/quest", answers);

  return res.data;
};
