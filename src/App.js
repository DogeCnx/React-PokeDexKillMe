import React, { useState, useEffect } from "react";
import "./styles.css";

async function fetchData() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  return response.json();
}

export default function App() {
  const [repoData, setRepoData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const pokeRepo = await fetchData();
      setRepoData(pokeRepo);
    } catch {
      setError("Error ดึง api ไอ้ออก!! ");
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="container">
      <h1>PokeDex</h1>
      <div className="content">
        {!isLoading && repoData && (
          <ul>
            {repoData.results.map((item) => (
              <li>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
