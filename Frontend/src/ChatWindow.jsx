import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { SyncLoader } from "react-spinners";


function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    prevChats,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logIn, setLogIn] = useState(false);



  const getReply = async () => {
    setLoading(true);
    setNewChat(false);

    // console.log("message", prompt, "threadId", currThreadId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  //append new chat to previous chat
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    setPrompt("");
  }, [reply]);


  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  }


  const userLogIn = () => {
      
  }

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          Nova_GPT &nbsp;<i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItems"><i class="fa-solid fa-arrow-up-right-from-square"></i>Upgrade Plan</div>
          <div className="dropDownItems"><i class="fa-solid fa-gear"></i>Setting</div>
          <div className="dropDownItems" onClick={() => {
            userLogIn()
          }}><i class="fa-solid fa-right-from-bracket"></i>Log In</div>
        </div>
      )}

      <Chat></Chat>

      <SyncLoader color="#fff" loading={loading}></SyncLoader>

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          ></input>
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          NovaGPT can mistake important info. See cookie Performance
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
