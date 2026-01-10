import { useEffect, useState } from "react";
import API from "../Api/axios";

export const VoteResult=()=>{
  const [results, setResults] = useState([]);

  useEffect(() => {
    API.get("/candidate/vote/count")
      .then((res) => setResults(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Election Results</h2>
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            {item.party} — {item.count} votes
          </li>
        ))}
      </ul>
    </div>
  );
}
