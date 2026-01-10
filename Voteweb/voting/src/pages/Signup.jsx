import { useState } from "react"
import API from "../Api/axios";
import { Link } from "react-router";

export const Signup=()=>{
    const[form,setForm]=useState({
        name:"",
        age:"",
        address:"",
        aadharCardNo:"",
        password:"",
    });
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
      const res = await API.post("/user/signup", {
        name: form.name,
        age: Number(form.age), // 🔥 ensure number
        address: form.address,
        aadharCardNo: form.aadharCardNo,
        password: form.password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Signup Successful");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.error || "Signup failed");
    }
  };
    return(
       
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
                <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-1 ">Create account</h2>
            <form onSubmit={handleSubmit}>
                <input className="w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition" name="name" placeholder="Name" onChange={handleChange} />
                <input className="w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition" name="age" placeholder="Age" onChange={handleChange} />
                <input className="w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition" name="address" placeholder="Address" onChange={handleChange} />
                <input className="w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition" name="aadharCardNo" placeholder="Aadhar Number" onChange={handleChange} />
                <input className="w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition" name="password" type="password" placeholder="Password" onChange={handleChange} />
                <button className="w-full bg-green-600 rounded-lg text-white hover:bg-blue-700 transition-all duration-300
                       hover:scale-[1.02] active:scale-[0.98] font-semibold " type="submit">Create account</button>
            </form>
            <div className="flex justify-center mb-4">
                <p className="text-center text-sm text-gray-500 mt-6 m-2">Already have an account?</p>
                <p className="text-center text-sm text-green-500 mt-6"><Link to="/login">Login</Link></p>
            </div>
        </div>
        </div>    
    )
    
}