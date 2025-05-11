import React, { useEffect, useState } from "react";

const ChallongeTest = () => {
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchCSV = async () => {
      const url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRP4iJUzd4VCEzHTYBLbgMeIaalCheHOopp7NtUObTx2675mVYy_wz6TTuwWVKgcOjaGbixI7RzimLF/pub?gid=1116362271&single=true&output=csv";

      const res = await fetch(url);
      const text = await res.text();
      const lines = text.split("\n"); 

      const parsedNames = lines
        .slice(1) // omitir encabezado
        .map((line) => line.split(",")[1].trim()) // tomar columna A
        .filter((name) => name !== ""); // ignorar vacíos

      setNames(parsedNames);
    };

    fetchCSV();
  }, []);

  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-bold mb-4">Jugadores (Columna A desde A2):</h2>
      <ul className="list-disc pl-5">
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChallongeTest;
