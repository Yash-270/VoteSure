import { useParams } from 'react-router';
import API from "../Api/axios";

export const Vote=()=>{
    const {id}=useParams();
    const vote=async ()=>{
       try {
      await API.post("/candidate/vote/"+id);
      alert("Voted Successfully");
    } catch (err) {
      console.log(err.response?.data);
      alert("Already Voted / Unauthorized / Error");
    }
  };
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
      <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
        
        {/* ICON */}
        <div className="text-4xl mb-3">🗳️</div>

        {/* TITLE */}
        <h2 className="text-xl font-bold mb-2">
          Confirm Your Vote
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-600 text-sm mb-5">
          Once you submit your vote, it cannot be changed.
        </p>

        {/* BUTTON */}
        <button
          onClick={vote}
          className="w-full bg-green-600 text-white py-2 rounded
                     hover:bg-green-700"
        >
          Confirm Vote
        </button>

      </div>
    </div>
  );
}