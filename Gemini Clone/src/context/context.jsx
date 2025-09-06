import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, next) => {
    setTimeout(function () {
      setResultData((prev) => prev + next);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const animateResponse = (text) => {
    const words = text.split(" ");
    let i = 0;

    const interval = setInterval(() => {
      if (i < words.length) {
        const word = words[i];
        if (word && word !== "undefined") {
          // ✅ filter out empty/undefined
          setResultData((prev) => prev + word + " ");
        }
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  const onSent = async (prompt) => {
    try {
      setResultData("");
      setLoading(true);
      setShowResult(true);

      let response;
      if (prompt !== undefined) {
        response = await runChat(input);
        response = response?.toString().trim() || ""; // ✅ fallback to empty string
      } else {
        setPrevPrompts((prev) => [...prev, input]);
        setRecentPrompt(input);
        response = await runChat(input);
      }

      // Format bold
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      // Line breaks
      let newResponse2 = newResponse.split("*").join("<br>");

      // Animate response safely
      animateResponse(newResponse2);

      setLoading(false);
      setInput("");
    } catch (err) {
      console.error("Error in onSent:", err);
      setLoading(false);
    }
  };

  const ContextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={ContextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
