import { useEffect, useState } from "react"
import API from "../Api/axios";

export const Admin = () => {
  const [candidates, setCandidates] = useState([]);
  const [editId, setEditId] = useState(null);


  const [form, setForm] = useState({
    name: "",
    party: "",
    age: "",
    image: "",
    
  });

  // 🔄 Fetch candidates
  const fetchCandidates = async () => {
    try {
      const res = await API.get("/candidate/list");
      setCandidates(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // ✏️ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ ADD / ✏️ UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/candidate/${editId}`, form);
        alert("Candidate Updated");
      } else {
        await API.post("/candidate", form);
        alert("Candidate Added");
      }

      setForm({ name: "", party: "", age: "",image: "" });
      setEditId(null);
      fetchCandidates();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Operation Failed");
    }
  };

  // 🗑️ DELETE
  const deleteCandidate = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/candidate/${id}`);
      alert("Candidate Deleted");
      fetchCandidates();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Delete Failed");
    }
  };

  // ✏️ EDIT
  const editCandidate = (c) => {
    setEditId(c._id);
    setForm({
      name: c.name,
      party: c.party,
      age: c.age,
      image: c.image,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Candidate Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="party"
          placeholder="Party"
          value={form.party}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="text"
          placeholder="Paste image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
          required
        />
        <br /><br />


        

        <button type="submit">
          {editId ? "Update Candidate" : "Add Candidate"}
        </button>
      </form>

      <hr />

      {/* LIST */}
      <h2>Candidate List</h2>

      {candidates.length === 0 && <p>No candidates found</p>}

      {candidates.map((c) => (
        <div
          key={c._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <p><b>Name:</b> {c.name}</p>
          <p><b>Party:</b> {c.party}</p>
          <p><b>Age:</b> {c.age}</p>
         {c.image && (
          <div
            style={{
              width: "120px",
              height: "120px",
              overflow: "hidden",
              borderRadius: "8px",
              marginBottom: "10px",
              background: "#eee",
            }}
          >
            <img
              src={c.image}
              alt={c.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/120?text=No+Image";
              }}
            />
          </div>
        )}



          <button type="button" onClick={() => editCandidate(c)}>
            Edit
          </button>

          <button
            type="button"
            onClick={() => deleteCandidate(c._id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

