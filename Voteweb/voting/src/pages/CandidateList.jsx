import { useEffect, useState } from "react"
import API from "../Api/axios";
import { useNavigate } from "react-router";

export const CandidateList=()=>{
    const[list,setList]=useState([]);
    const navi=useNavigate();
    useEffect(()=>{
        API.get("/candidate/list").then((res)=>{
            setList(res.data);
        })
    },[]);
    return(
        <div className="min-h-screen bg-gray-50">
            <h2 className="text-4xl font-bold text-center mb-4 text-green-700">
            Candidate List
            </h2>
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800"> 🗳️ </h2>
            <p className="text-center text-gray-500 mb-10">
            Choose your leader and cast your vote wisely
            </p>

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                {list.map((l) => (
                    <div
                    key={l._id}
                    className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
                    >
                    {/* Image */}
                    <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-500">
                        <img
                        src={l.image}
                        alt={l.name}
                        className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-gray-800">{l.name}</h3>

                    {/* Party */}
                    <p className="text-green-600 font-medium mb-1">{l.party}</p>

                    {/* Age */}
                    <p className="text-gray-500 mb-4">Age: {l.age}</p>

                    {/* Button */}
                    <button
                        onClick={() => navi("/vote/" + l._id)}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Vote
                    </button>
                    </div>
                ))}
                </div>

        </div>
    )
    
}