import {React, useEffect,useState} from "react";
import ReactStars from 'react-stars';
import {useParams} from "react-router-dom";
import {db} from "./firebase";
import{doc,getDoc} from "firebase/firestore";
import {Bars} from "react-loader-spinner";
import Reviews from "./review";
const Detail=()=>{
    const {id}=useParams();
    const[loading,setloading]=useState(false);
    const [data ,setdata]=useState({
     title:"",
     year:"", 
     image: "",
     descripition:"",
     rating:5,
     rated:5 
    });
    useEffect(()=>{
        setloading(true);
        async function getData(){
     const _doc= doc(db,"movies", id);
     const _data=await getDoc(_doc);
     setdata(_data.data());
     setloading(false);
        }
        getData();
    },[]);
    return(
<div className=" bg-fuchsia-600 p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
   {  loading?<Bars height={30} color='white'/> : 
   <>
   <img className="h-96 block md:sticky top-24"  src={data.image}/>
    <div className=" ml-4 w-1/2">
        <h1 className="text-3xl font-bold text-white">
            {data.title}<span className ="text-xl">({data.year})</span></h1>
            <ReactStars
    size={20}
    half={true}
   value={data.rating/data.rated}
    edit={false}
    />
            <p className="text-white"> {data.descripition}</p>
    <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>   
    </div>
    </>}
</div>
    )
}
export default Detail;