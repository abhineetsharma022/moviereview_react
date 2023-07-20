import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {RecaptchaVerifier,signInWithPhoneNumber,getAuth} from "firebase/auth"
import app from './firebase'
import swal from "sweetalert";
import {userRef} from "./firebase";
import { addDoc } from "firebase/firestore";
import {bcrypt} from  "bcryptjs";
const auth =getAuth(app)
const Signup = () => {
  const navigate=useNavigate();
 const [form,setform]=useState({
    name:"",
 mobile: 0,
password:" " 
 });
 const [loading,setLoading]=useState(false);
 const [otp,setotp]=useState(false);
 const[otpst ,setotpst]=useState("");//for storing otp 
   const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }
  const requestOtp = () => {
    setLoading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setotp(true);
        setLoading(false);
      }).catch((error) => {
        console.log(error)
      })
}

const verifyOTP = () => {
  try {
    setLoading(true);
    window.confirmationResult.confirm(otpst).then((result) => {
      uploadData();
      swal({
        text: "Sucessfully Registered",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      navigate('/login')
      setLoading(false); 
    })
  } catch (error) {
    navigate("/signin");
  }
}
const uploadData =async()=>{
  const salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(form.password,salt);
   await addDoc(userRef,{
    name:form.name,
    password:hash,
    mobile:form.mobile
 });
}

  return (
    <div className="w-full flex flex-col mt-8 items-center">
         <h1 className=" text-xl font-bold text-white ">Signup</h1>
        {otp ?
        <>
          <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
           enter otp
          </label>
          <input
          type={Number}
            id="message"
            name="message"
            value={otpst}
            onChange={(e)=>setotpst(e.target.value)}        
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full">
        <button
        onClick={verifyOTP}
          class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
         Confirm otp
        </button>
      </div>
        </>       
       :
        <> 
      
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Name
          </label>
          <input
            id="message"
            name="message"
            value={form.name}
            onChange={(e)=>setform({...form,name:e.target.value})}        
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
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
       onClick={requestOtp}
          class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
         Request OTP
        </button>
      </div></>}
      <div>
        <p className="text-white">Already have  an account? <Link to={'/login'}><span className="text-blue-500">Login</span></Link></p>
      </div>
      <div  id="recaptcha-container"></div>
      
    </div>
  );
};

export default Signup;

