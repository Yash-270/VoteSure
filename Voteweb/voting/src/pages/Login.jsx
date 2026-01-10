import { useState } from "react"
import API from "../Api/axios";
import { Link,useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    aadharCardNo: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          {/* Aadhar */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Aadhar Number
            </label>
            <input
              type="text"
              name="aadharCardNo"
              value={form.aadharCardNo}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter Aadhar"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <div className="flex justify-center mb-4">
                <p className="text-center text-sm text-gray-500 mt-6 m-2">Don't have an account?</p>
                <p className="text-center text-sm text-green-500 mt-6"><Link to="/signup">Sign Up</Link></p>
        </div>

      </div>
    </div>
  );
};