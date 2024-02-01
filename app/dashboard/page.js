'use client'
import signout from '@/config/signout'
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect,useState } from 'react'
const ChatEngine=dynamic(() =>
import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

const Dashboard=()=>{
    const userInfo=useContext(AuthContext);
    const user=userInfo.user;


    const [loading, setloading] = useState(true);
    const getFile=async (url)=>{
     const res=await fetch(url);
     const data=await res.blob();
return new File([data],"userPhoto.jpg",{type:'image/jpeg'})
    }
useEffect(()=>{
   
    const fetchData = async () => {
        try {
          await axios(`https://api.chatengine.io/users/me/`, {
            headers: {
              'Content-Type': 'application/json',
              "Project-ID": process.env.NEXT_PUBLIC_MY_Project_ID,
              "User-Name": user.displayName,
              "User-Secret": user.uid,
            },
          });
          setloading(false);
        } catch (err) {
          console.log(err);
          let formData = new FormData();
          formData.append('email', user?.email);
          formData.append('username', user?.displayName);
          formData.append('secret', user?.uid);
  
          const avatar = await getFile(user?.photoURL);
          formData.append('avatar', avatar, avatar.name);
  
          try {
            await axios.post(
              'https://api.chatengine.io/users',
              formData,
              { headers: { "private-key": process.env.NEXT_PUBLIC_MY_Project_Key } }
            );
            setloading(false);
          } catch (err) {
            console.log(err);
          }
        }
      };
  
      fetchData();
},[user])


if (!user||loading) return 'loading...'
    return (
        <>
        
<div className='flex justify-between sm:justify-center items-center border-b-2  shadow-inner boreder-black p-4 relative bg-black text-white'>
    <span className='text-[24px] sm:text-[38px] font-bold '>Chat App</span>
    <button className='absolute right-4 md:right-40 sm:right-16 bg-blue-500 p-2 text-white text-[2xl] rounded-lg' onClick={signout}>Sign Out</button>
</div>
<div className='w-full '>
            <ChatEngine
                 height="calc(100vh - 80px)"
                 projectID={process.env.NEXT_PUBLIC_MY_Project_ID}
                 userName={user.displayName}
                 userSecret={user.uid}
                 onConnect={(chatProps, chat) => {
                   console.log('Chat Engine Connected:', chatProps, chat);
                 }}
                 onDisconnect={() => {
                   console.log('Chat Engine Disconnected');
                 }} 
                 renderNewMessageForm={() => <MessageFormSocial />} 
                 />
</div>

        </>


    );
}

export default Dashboard