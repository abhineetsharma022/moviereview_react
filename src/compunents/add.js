import  React, { useContext} from 'react';
import { useState } from 'react';
import {TailSpin}from "react-loader-spinner"
import { addDoc } from 'firebase/firestore';
import { movieRef } from './firebase';
import swal from 'sweetalert';
import { Appstate } from "../App";
import {  useNavigate  } from "react-router-dom";
const Add=()=>{
  const useAppstate= useContext(Appstate);
  const navigate=useNavigate();
    const [form,setform]=useState({
        title:"",
        year:"",
        descripition:"",
        image:"",
        rating:0,
        rated:0
    });
    const [loading ,setloading]=useState(false);
   const addmovie= async()=>{

    setloading(true);
    try{ 
      if(useAppstate.login){ 
    await addDoc(movieRef,form);
    swal({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
   setform({
    title:"",
        year:"",
        descripition:"",
        image:""
   })
  }else{
    navigate('/login');
  }
  }catch (err){
    swal({
      position: 'top-end',
      icon: 'error',
      title: err,
      showConfirmButton: false,
      timer: 1500
    })
  }
   setloading(false);
   }
    return (
        <div className='bg-amber-200'>
<section class="text-gray-600 body-font relative">
  <div class="container px-5 py-6 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">ADD MOVIE</h1>
     
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-600">Title</label>
            <input 
            value={form.title}
            onChange={(e)=>setform({...form,title:e.target.value})}
            type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">year</label>
            <input 
             value={form.year}
             onChange={(e)=>setform({...form,year:e.target.value})}
            type="text" id="email" name="year" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-600">image</label>
            <input 
             value={form.image}
             onChange={(e)=>setform({...form,image:e.target.value})}
            id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-16 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-600">Your View</label>
            <textarea 
             value={form.descripition}
             onChange={(e)=>setform({...form,descripition:e.target.value})}
            id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <button onClick={addmovie} class="flex mx-auto text-white
           bg-indigo-500 border-0 py-2
            px-8 focus:outline-none hover:bg-indigo-600
 rounded text-lg">{loading ? <TailSpin height={10} color="white"/> :'Submit'}</button>
        </div>
       </div>
       </div>
       </div>
</section>
        </div>
    )
}

export default Add;