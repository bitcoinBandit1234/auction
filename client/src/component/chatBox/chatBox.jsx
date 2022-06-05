import { useEffect, useState, useRef } from "react";
import "./chatboxDesign.css";

const ChatBox = ({socket, user, seller})=>{
   const [message, setMessage] = useState("");
   const [messageList, setMessageList] = useState([]);
   const chatRef = useRef();

   const sendMessage = async ()=>{
       if(message.trim() != ""){
           const messageInfo = {
               room: seller,
               sender: user.username,
               msg: message
           }
           await socket.emit("sendMessage", messageInfo);
           setMessageList((list)=>[...list, messageInfo])
       }
   }

   useEffect(()=>{
    socket.on('receiveMessage', (data)=>{
        setMessageList((list)=>[...list, data])
    })
   }, [socket])

    return(
    <div ref={chatRef} className="chatbox">
        <div className="chatbox__title">
            <h3>Message</h3>
            <span onClick={()=>chatRef.current.classList.add("chatbox__invisible")}>&#10060;</span>
        </div>

        <div className="chatbox__messages">
            {messageList.map((indieMessage, index)=>{
                return(
                    <p key={index} className={indieMessage.sender == user.username? "chatbox__messages__sender": "chatbox__messages__receiver"}>{indieMessage.msg}</p>
                );
            })}
        </div>
        <div className="chatbox__input">
            <input type="text" 
            onChange={(e)=>setMessage(e.target.value)} 
            placeholder=" ... say something" 
            className="chatbox__input__message"/>
            <button onClick={sendMessage} className="chatbox__input__button">send</button>
        </div>
    </div>
    );
}

export default ChatBox;