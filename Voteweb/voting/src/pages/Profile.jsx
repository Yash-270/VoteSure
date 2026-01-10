import { useEffect, useState } from "react"
import API from "../Api/axios";

export const Profile=()=>{
    const[user,setUser]=useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        API.get("/user/profile")
         .then((res)=>{
            setUser(res.data.user);
         })
         .catch(()=>{
            alert("Unable to Load Profile");
         });
    },[]);

    if (!user) return <p>Loading...</p>;

    const handleChangePassword=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            await API.put("/user/profile/password",{
                currentPassword,
                newPassword,
            });
            alert("Password Update Successfully");
            setCurrentPassword("");
            setNewPassword("");
        }
        catch(err){
            alert(err.response?.data?.error || "Password update failed ❌");
        } finally {
            setLoading(false);
        }
    };
    return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex items-center justify-center">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow items-center justify-center">

        {/* PROFILE INFO */}
        
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>

        <p><b>Name:</b> {user.name}</p>
        <p><b>Age:</b> {user.age}</p>
        <p><b>Address:</b> {user.address}</p>
        <p><b>Aadhar:</b> {user.aadharCardNo}</p>
        <p><b>Role:</b> {user.role}</p>
        <p><b>Voted:</b> {user.isVoted ? "Yes" : "No"}</p>
     
        <hr className="my-6" />

        {/* CHANGE PASSWORD */}
        <h3 className="text-xl text-center font-semibold mb-3">
          Change Password
        </h3>

        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border p-2 rounded mb-3"
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            required
          />
        <div className="flex justify-center mt-4">
           <button type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Update Password
          </button>
        
          
           </div>
        </form>

      </div>
    </div>
  );
};

