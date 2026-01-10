import { useEffect, useState } from "react"
import { getUser } from "../utils/Auth";
import { Navigate } from 'react-router';

export const AdminRoute=({children})=>{
    const[allow,setAllow]=useState(null);
    useEffect(()=>{
        getUser()
            .then((role)=>{
            setAllow(role === "admin");
        })
        .catch(()=>setAllow(false));
    },[]);
    
    if(allow === null) return <p>Loading...</p>
    if(!allow) return <Navigate to="/candidates"/>;
    return children;
}