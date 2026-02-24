import { v4 as uuidv4 } from "uuid";

export const getOrSetSession = () => {
  let sessionId = localStorage.getItem("chat_session_id");
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("chat_session_id", sessionId);
  }
  return sessionId;
};

export const resetSession = () => {
  const newId = uuidv4();
  localStorage.setItem("chat_session_id", newId);
  return newId;
};
