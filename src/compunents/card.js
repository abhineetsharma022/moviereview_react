
import React, {useState ,useEffect} from "react";
import ReactStars from 'react-stars';
import {TailSpin} from "react-loader-spinner";
import {doc, getDocs} from "firebase/firestore";
import {movieRef} from "./firebase";
import {Link} from "react-router-dom";
const Card=()=>{
    const [data,setData]=useState([]);
    const [loading ,setloading]=useState(false);
  useEffect(()=>{
  async function getdata(){
  setloading(true);
 const _data=await getDocs(movieRef);
    _data.forEach(( doc )=>{
    setData((prv)=>[...prv,{...( doc.data()), id: doc.id}])
  })
  setloading(false);
   }
  getdata();
  },[])
    return(
        <div className=" flex flex-wrap justify-between  h-full bg-fuchsia-400 text-amber-100">
            {loading ? <div className="w-full flex justify-center items-center h-96"><TailSpin/></div>: data.map(  (e,i)=>{ 
                return( 
                    <Link to={`/detail/${e.id}`}>
<div key={i}className="max-h-screen bg-fuchsia-800  card font-medium shadow-lg p-2 hover:-translate-y-2 cursor-pointer m-3 transition-all duration-500 ">
<img className="h-60 md:h-72" src={e.image} />
    <h1>{e.year}</h1>
    <h1>
    <ReactStars
    size={20}
    half={true}
    value={e.rating/e.rated}
    edit={false}
    
    />

    </h1>
    <p>{e.descripition}</p>
</div>
</Link>
                      );})}      </div>
    )
}
export default Card