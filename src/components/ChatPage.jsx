import React, { useContext, useEffect, useRef, useState } from 'react'
import "./ChatPage.css"
import { RightSectionInChatPage } from './RightSectionInChatPage';
import Context from '../context/contextapi'
import axios from 'axios';


//It will display either all conversations or user search results
const Conversations = (props) => {
  let activeClass=props.currentConversation?"activeConversation":"";
  return (<>
    <div className={`conversationsInLeftSection d-flex align-items-center cursor-pointer ${activeClass}`} onClick={()=>props.UserResult?props.OpenConversation(props._id):props.OpenConversation(props.conversationData)}>
      <img src={(props.profileImagescr ? props.profileImagescr : "/images/NoProfile.png")} className='me-2' alt="Profile" />
      <div className="nameAndLastMessageInConversations">
        <h6 className='mb-0 nameInConversation'>{props.username}</h6>
        {!props.UserResult && <p className='mb-0 lastMessageInConversation'>{props.lastMessage}</p>}
      </div>
    </div>
  </>)
}

export const ChatPage = ({socket}) => {
  const contextData = useContext(Context);
  const [userData, setUserData] = useState("");
  const [conversationList, setConversationList] = useState([]);
  const [currentConversation,setCurrentCoversation] = useState({});
  // const [searchUserQuery,setSearchUserQuery] = useState('');
  const searchUserQuery= useRef();
  const [searchUserList,setSearchUserList]= useState([]);
  const [currentSection,setCurrentSection]=useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/user/${contextData.user.userID}`);
      if (result.status === 200) {
        setUserData(result.data);
        const conversationResult = await axios.get(`/conversation/getAllConversations/${contextData.user.userID}`);
        if (conversationResult.status === 200) {
          setConversationList(conversationResult.data);
          console.log(conversationResult.data[0]);
          conversationResult.data.length > 0 && setCurrentCoversation(conversationResult.data[0]);
        }
        else
          console.log("Error in fetching conversation");
      }
      else {
        console.log("Error In fetching User data");
      }
    }
    fetchData();
  }, [contextData.user.userID])

  const openAConversationFromUserProfile=async (id)=>{
    const result= await axios.post(`/conversation/newConversation/${contextData.user.userID}`,{id});
    console.log(result.data);
    searchUserQuery.current.value="";
    setSearchUserList([]);
    if(!conversationList.find(element=>element._id===result.data._id)){
      setConversationList([...conversationList,result.data]);
    }
    OpenAConversation(result.data);
  }

  const OpenAConversation = (conversation)=>{
    setCurrentCoversation(conversation);
    setCurrentSection(!currentSection);
}

  const generateConversation = (element) => {
    if (element.participants[0]._id === contextData.user.userID) {
      return <Conversations conversationData={element} lastMessage={element.lastMessage} key={element.participants[1]._id} {...element.participants[1]} currentConversation={element._id===currentConversation._id} OpenConversation={OpenAConversation}/>
    } else {
      return <Conversations conversationData={element} lastMessage={element.lastMessage} key={element.participants[0]._id} {...element.participants[0]} currentConversation={element._id===currentConversation._id} OpenConversation={OpenAConversation}/>
    }
  }

  const getUserResults = (e)=>{
      const fetchData= async ()=>{
        if(e.target.value==="")
        setSearchUserList([]);
        else{
          const result = await axios.get(`/user/findUsers/${contextData.user.userID}/${e.target.value}`);
          console.log(result);
          setSearchUserList(result.data);
        }
      }
      fetchData();
  }
  const getSenderAndReciever=()=>{
    if(!currentConversation.participants){
      return {};
    }
    if(currentConversation.participants[0]._id===contextData.user.userID){
      return {sender: currentConversation.participants[0], reciever: currentConversation.participants[1]};
    }else{
      return {sender: currentConversation.participants[1], reciever: currentConversation.participants[0]}; 
    }
  }

  return (
    <div className="container-fluid p-0">
    <div className='chatOuterContainer w-100 displayFlexContainer row m-0'>
      <div className="chatInnerContainer d-flex col-10 mx-auto p-0">
        <div className={`chatLeftSection ${currentSection?"d-none d-md-block":""}`}>
          <div className="chatLeftHeading d-flex align-items-center justify-content-between">
            <h3 className='chatLogo mb-0 text-white '>FlavourFusion</h3>
            <div>
              <img src={(userData.profileImagescr ? userData.profileImagescr : "/images/NoProfile.png")} className=' img-fluid chatProfileImageInHeading' alt="ProfileImage" />
              <span className="chatUsernameInHeading ms-1">{userData.username ? userData.username : "No Username"}</span>
            </div>
          </div>
          <div className="chatSearchBar">
            <input type="text" className='chatSeachBarInput' ref={searchUserQuery} onChange={getUserResults} placeholder='Find a user' />
          </div>
          <hr className='mt-0 mb-1' />
          <div className="chatListOfConversations">
            {searchUserList.length>0? searchUserList.map((element)=><Conversations {...element} UserResult OpenConversation={openAConversationFromUserProfile}/>) : conversationList && conversationList.map(generateConversation)}
          </div>
        </div>

        {/* Right Section In Chat Page */}
       <RightSectionInChatPage socket={socket} currentSection={currentSection} setCurrentSection={setCurrentSection} currentConversation={currentConversation} {...getSenderAndReciever()}/>
        
      </div>
    </div>
    </div>
  )
}
