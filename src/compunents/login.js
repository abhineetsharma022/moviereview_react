import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {query, where, getDocs} from 'firebase/firestore'
import swal from 'sweetalert';
import bcrypt from 'bcryptjs'
import {Appstate, useAppstate} from "../App";
import { userRef } from "./firebase";
const Login = () => {
  const navigate=useNavigate();
  const useAppstate= useContext(Appstate);
 const [form,setform]=useState({
 mobile: 0,
password:" " 
 });
 const [loading,setLoading]=useState(false);
 
  const login=async()=>{
   setLoading(true);
    try {
      const quer=query(userRef,where('moblie','==',form.mobile))
      const querySnapshot=await getDocs(quer);
       querySnapshot.forEach((doc)=>{
        const _data=doc.data();
        const isUser=bcrypt.compareSync(form.password,_data.password);
        if(isUser){
          useAppstate.setlogin(true);
          useAppstate.setUserNamr(_data.name);
          navigate('/');
          swal({
            position: 'top-end',
            icon: 'success',
            title: "logged In",
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          swal({
            position: 'top-end',
            icon: 'error',
            title: "invalid Credentials",
            showConfirmButton: false,
            timer: 1500
          })
        }
       })
     
    } catch (error) {
      swal({
        position: error.message,
        icon: 'error',
        title: "review sent",
        showConfirmButton: false,
        timer: 1500
      })
    }
    setLoading(false);
  }

  return (
    <div className="w-full flex flex-col mt-8 items-center">
      <h1 className="text-xl font-bold text-white">Login</h1>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Mobile No.
          </label>
          <input
            type={"number"}
            id="message"
            name="message"
          value={form.mobile}
          onChange={(e)=>setform({...form,mobile:e.target.value})}
           
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
            id="message"
            name="message"
            value={form.password}
            onChange={(e)=>setform({...form,password:e.target.value})}        
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full">
        <button
        onClick={login}
          class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
         login
        </button>
      </div>
      <div>
        <p className="text-white">Do not have  account? <Link to={'/signin'}><span className="text-blue-500">Signup</span></Link></p>
      </div>
    </div>
  );
};

export default Login;