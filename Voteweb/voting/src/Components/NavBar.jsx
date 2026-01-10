import { useEffect, useState } from "react";
import { NavLink,Outlet,useNavigate } from 'react-router';
import API from "../Api/axios";

export const NavBar=()=>{
    const navi=useNavigate();
    const [role, setRole] = useState(null);
    const token = localStorage.getItem("token");
    useEffect(() => {
        API.get("/user/profile")
        .then((res) => setRole(res.data.user.role))
        .catch(() => setRole(null));
    }, []);
    const logout=()=>{
        localStorage.removeItem("token");
        navi("/");
    }
    return (
      <>
    <nav className="w-full bg-green-600 text-white px-3 py-4 flex justify-between items-center shadow-md">
        <NavLink to="/" className="text-xl font-bold">VoteSure</NavLink>
      <div className="flex gap-14 items-center text-sm font-medium">
        <NavLink to="/" className="hover:bg-green-700 text-base">Home</NavLink>
        <NavLink to="/about" className="hover:bg-green-700 text-base">About</NavLink>
        <NavLink to="/candidates" className="hover:bg-green-700 text-base">Vote</NavLink>
        {role === "voter" && (
          <>
            <NavLink to="/profile" className="hover:bg-green-700 text-base">Profile</NavLink>
          </>
        )}

        {role === "admin" && (
          <>
            <NavLink to="/admin" className="hover:bg-green-700">Admin Panel</NavLink>
            <NavLink to="/result"className="hover:bg-green-700" >Vote Results</NavLink>
          </>
        )}
        {!token?(
          <NavLink
              to="/login"
              className="bg-green-500 px-3 py-2 rounded-full hover:bg-green-600 border:focus-ring"
            >
              Login
          </NavLink>
        )
        :(<button onClick={logout} className="bg-red-500 px-4 py-2  text-base font-semibold rounded-full hover:bg-red-600">Logout</button>
        )}

      </div>
      </nav>
      <Outlet />
    </>
  );
}