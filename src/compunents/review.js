import React, { useContext } from "react";
import ReactStars from 'react-stars';
import { useState,useEffect } from "react";
import { reviewsRef,db } from "./firebase";
import { addDoc,doc,updateDoc,query,where,getDocs} from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import swal from 'sweetalert';
import {Appstate, useAppstate} from "../App";
import {  useNavigate  } from "react-router-dom";



const Reviews = ({id,prevRating,userRated})=>{
  
    const[rating,setRating]=useState(0);
    const[loading,setloading]=useState(false);
    const[rloading,setrloading]=useState(false);
    const useAppstate= useContext(Appstate);
    const navigate=useNavigate();
    const[form,setform]=useState("");
    const[data,setdata]=useState([]);
    const [change,setChange]=useState(0);
    const send= async ()=>{
      setloading(true);
        try{
          if(useAppstate.login){ 
           await addDoc(reviewsRef,{
                movieid:id,
                 name:useAppstate.userName,
                 rating:rating,
                 thaught:form,
                 timestamp:new Date().getTime()
                  
            })
            const ref=doc(db,"movies",id);
            await updateDoc(ref,{
                rating:prevRating+rating,
                rated:userRated + 1    
            })
            setRating(0);
            setform("");  
            setChange(change+ 1);  
            swal({
                position: 'top-end',
                icon: 'success',
                title: "review sent",
                showConfirmButton: false,
                timer: 1500
              })
            }else{
              navigate('/login');
            }
        }
        catch{
            swal({
                position: 'top-end',
                icon: 'error',
                title: "err",
                showConfirmButton: false,
                timer: 1500
              })
        }
        setloading(false);
    }
    useEffect(()=>{
      async function getData(){
        setrloading(true);
        setdata([]);
       const  q=query(reviewsRef,where('movieid','==',id))
       const querySnapshot=await getDocs(q);
       querySnapshot.forEach((doc) => {
          setdata((prev)=>[...prev,doc.data()])
       })
        setrloading(false);
      }
      getData();
    },[change])
    return(
        <div>
 <ReactStars
    size={35}
    half={true}
    value={rating}
   onChange={(rate)=>setRating(rate)}
 
    
    />
    <input
    value={form}
    onChange={(e)=>setform(e.target.value)}
    placeholder="tumhe kaise lagi"
    className="w-full outline-double"
    />
    <button onClick={send} className="bg-green-600 w-full flex justify-center">
        {loading?<TailSpin height={16}/>:"share"} </button>
        {
            rloading?<TailSpin/>:
            <div className="mt-4">
            {
              data.map((e,i)=>{
                return(
                  <div key={i} className=" bg-fuchsia-800 p-2 w-full mt-2">
                 <div> <p className="text-white">{e.name}</p>
                 <ReactStars
              size={20}
            half={true}
                value={e.rating}
              edit={false}    
                 />
                  <p className="text-white">{e.thaught}</p>
                  </div>
                  <div className="text-white">
                    {new Date(e.timestamp).toLocaleDateString()}
</div>
                  </div>
                )
              })
            }
            </div>
        }
            </div>
    )
}
export default Reviews