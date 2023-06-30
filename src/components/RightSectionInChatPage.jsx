import React, { useContext, useEffect, useRef, useState } from 'react'
import './RightSectionInChatPage.css'
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Context from '../context/contextapi'
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import axios from 'axios';
TimeAgo.addDefaultLocale(en)

const Message = (props) => {
    
    const timeAgo = new TimeAgo('en-US')
    return (<>
      <div className={`messageContainer ${props.msgType}`}>
        <div className={`imageInMessage me-2 ms-2 ${props.msgType === "userMessage"?"align-items-end":"align-items-start"}`}>
          <img src={(props.profileImagescr ? props.profileImagescr : "/images/NoProfile.png")} alt="Profile" />
          <div className='timeAgoOfMessage '>{timeAgo.format(new Date(props.createdAt))}</div>
        </div>
        <div className={props.msgType === "userMessage" ? "messageSentByUser" : "messageRecievedByUser"}>
          {props.body}
        </div>
      </div>
    </>)
  }
export const RightSectionInChatPage = (props) => {
    const contextData=useContext(Context);
    const [messageList, setMessageList] = useState([]);
    const messageText=useRef();

    //For Srolling to newest message
    const ref = useRef(null);

  const scrollToLastFruit = () => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToLastFruit();
  }, [messageList]);

  // Getting New Message

    useEffect(()=>{
        const fetchData= async ()=>{
            if(props.currentConversation){            
                const result = await axios.get(`/message/getAllMessages/${props.currentConversation._id}`);
                if(result.status===200){
                    setMessageList(result.data);
                    console.log(result.data);
                }
            }
        }
        fetchData();
    },[props.currentConversation, contextData.user.userID])

    //For Showing Recieved messages in real time

    useEffect(()=>{
        props.socket.on('messageResponse',(data)=>{
            console.log("Recieved a message");
            setMessageList([...messageList,{senderId:data.from,createdAt:Date.now(),body : data.body}]);
        })
    },[props.socket,messageList]);

    const generateMessage=(element,index)=>{
        if(props.sender._id===element.senderId){
            return <Message {...element} {...props.sender} key={index}  msgType="userMessage"/>
        }
        return <Message {...element} {...props.reciever} key={index}/>
    }

    const sendAMessage=async ()=>{
        const result= await axios.post('/message/createNewMessage',{conversationId: props.currentConversation._id ,senderId: contextData.user.userID, body: messageText.current.value});
        props.socket.emit('message',{to:props.reciever._id, from: props.sender._id, body : messageText.current.value});
        setMessageList((value)=>[...value,result.data]);
        messageText.current.value="";
        console.log(result);
    }

  return (
    <>
        <div className={`chatRightSection ${props.currentSection?"":"d-none d-md-block"}`}>
          <div className="chatHeadingOfRightSection d-flex align-items-center justify-content-between">
            <div className='displayFlexContainer'>
            <ArrowBackTwoToneIcon className={`me-2 ${props.currentSection?"":"d-none"}`} onClick={()=>{props.setCurrentSection(false)}} />
            <span>{props.currentConversation ? (props.reciever? props.reciever.username: "No User") : "No User"}</span>
            </div>
            <div className="chatListOfIconsInRightSectionHeading displayFlexContaier">
              <VideocamIcon className='chatIconsInRightSectionHeading' />
              <CallIcon className='chatIconsInRightSectionHeading' />
              <MoreVertIcon className='chatIconsInRightSectionHeading' />
            </div>
          </div>
          <div className="chatBodyContainingMessagesInRightSection" ref={ref}>
            {messageList && messageList.map(generateMessage)}
          </div>
          <div className="chatMessageInputContainer d-flex align-items-center justify-content-between">
            <input type="text" placeholder='Type Something...' ref={messageText} className='chatMessageInput' />
            <div className="chatMessageIconsContainer">
              <AttachFileIcon className='chatMessageIcons' />
              <AddPhotoAlternateIcon className='chatMessageIcons' />
              <button type="button" className="btn chatMessageSendButton" onClick={sendAMessage}><SendIcon className=' text-white fs-6' /></button>
            </div>
          </div>
        </div>
    </>
  )
}
