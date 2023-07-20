
import Header from "./compunents/header";
import Card from "./compunents/card";
import Add from "./compunents/add";
import Detail from "./compunents/detail";
import { Route,Routes } from "react-router-dom";
import { createContext ,useState} from "react";
import Login from "./compunents/login";
import Signup from "./compunents/signin";
const Appstate=createContext();
function App() {
  const [login,setlogin]=useState(false);
  const [userName,setUserName]=useState("");
  return (
<Appstate.Provider value={{login,setlogin,userName,setUserName}}>    
    <div className=' bg-fuchsia-600'>
   <Header/>
   <Routes>
    <Route path="/" element={<Card/>}/>
    <Route path="/add" element={<Add/>}/>
    <Route path="/detail/:id" element={<Detail/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signin" element={<Signup/>}/>
   </Routes>

    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};