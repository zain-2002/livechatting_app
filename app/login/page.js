'use client'
import Link from 'next/link'
import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { getAuth, signInWithPopup,signInWithRedirect, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import firebase_app from '@/config/firebase';
const Login = () => {
  
  const auth = getAuth(firebase_app);
  const GoogleSignInHandler=(e)=>{
    e.preventDefault();
    
const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
  }
const FacebookSignInHandler=(e)=>{
  e.preventDefault();
    
  const provider = new FacebookAuthProvider();
signInWithRedirect(auth,provider)
}
  return (
    <>
      <div className='h-screen bg-blue-500 flex items-center justify-center text-white'>
<div className=' flex flex-col border-2  sm:w-[550px] rounded-lg shadow-lg items-center justify-center gap-3 '>
<h1 className='text-[35px] font-bold border-b-2 w-full text-center p-2'>Login</h1>

    <p className='text-[30px]'>You can Login With:</p>
    <div className='flex flex-col gap-4 text-[24px] p-4'>
    <button className='border-2 p-3 rounded-lg flex items-center gap-2 justify-center' onClick={GoogleSignInHandler}>Google <FaGoogle /></button>
      <button className='border-2 p-3 rounded-lg flex items-center gap-2 justify-center' onClick={FacebookSignInHandler}>Facebook<FaFacebookF /></button>

    </div>

</div>

      </div>
    </>
  
  )
}

export default Login