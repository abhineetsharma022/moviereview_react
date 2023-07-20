import React  from 'react';
import { Link } from 'react-router-dom';
import App, { Appstate } from '../App';
import { createContext,useContext } from 'react';
const Header=()=>{
  const useAppstate=useContext(Appstate);
    return(
        <div className=" Header bg-fuchsia-800 border-y-green-50  h-16  flex justify-between   ">
          <Link to={"/"}>  <div  className='   flex '> <span className=' hover:font-bold 6xl:first-line:first-letter: max-w-lg   text-5xl text-yellow-50'> Moviereview </span></div></Link>
        {  useAppstate.login?
          <Link to={'/add'}> <button className=' hover:bg-slate-600 border-spacing-2 border-stone-600 h-16 w-16 text-cyan-50 text-3xl'>
            <span className='m-2 ' color='white' cursor-pointer text-yellow-50 >add</span></button></Link>
            :
            <Link to={'/login'}> <button className='  hover:bg-slate-600 border-spacing-2 border-stone-600 h-16 w-16 text-cyan-50 text-3xl'>
            <span className='' color='white' cursor-pointer text-yellow-50 >login</span></button></Link>
          }  </div> 
    )
}
export default Header;