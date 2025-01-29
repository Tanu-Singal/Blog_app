import React, { useEffect } from 'react'
import { useState } from 'react'
import './Chatbox.css'
import assests from '../assets/assets'
const Chatbox1 = (props) => {
    const [input,setInput] =useState("");
    const [message,setMessage]=useState([]);
    const [isChatOpen, setIsChatOpen] = useState(true);
    const[floatmsg,setFloatmsg]=useState(false);
    const sendMessage=async()=>{
        if(!input.trim()) return;

        const usermsg={text:input,sender:"user"}
        setMessage(prevMessages => [...prevMessages, usermsg]);
        try{
          const response = await fetch('http://localhost:8000/api/ask', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ask: input })
        });
        if (!response.ok) {
          console.error('Response not OK', response.status, response.statusText);
          return;
      }
        const data=await response.json();
        console.log('Received data:', data);
        const botmsg={text:data.response,sender:"bot"};
        setMessage(prevMessages => [...prevMessages, botmsg]);
    }
    catch(err)
    {
        console.log(err);
    }
    setInput('');
    }
    const toggleChat = () => {
      setIsChatOpen(!isChatOpen);
  }
  useEffect(()=>{
    const interval=setInterval(()=>{
        setFloatmsg(true);
        setTimeout(()=>setFloatmsg(false),3000)
    },10000)
    return () => clearInterval(interval);
  },[isChatOpen])
  return (
    <div className="chatbot-wrapper">
          {floatmsg && isChatOpen && (
                <div className="floating-message" style={{color:"white"}}>How can I help you today?</div>
            )}
    {isChatOpen && (
        <img 
            src={assests.robot} 
            alt="Open Chat" 
            className="chat-icon"
            onClick={toggleChat}
        />
    )}
   {!isChatOpen && (
                <div className="chat-container" style={{backgroundColor:props.lightmode?"black":"white"}}>
                    <div className="chat-header" >
                        <span style={{color:"black"
                    }}>Chat Assistant</span>
                        <button onClick={toggleChat} style={{color:"red"}}>×</button>
                    </div>
                    <div className="chat-box">
                        {message.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="input-area">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
  
  )
}

export default Chatbox1