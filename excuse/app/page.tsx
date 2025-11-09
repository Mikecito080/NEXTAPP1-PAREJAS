"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [duckUrl, setDuckUrl] = useState<string>("");
  const [fact, setFact] = useState<string>("Cargando dato del día...");
  const [loading, setLoading] = useState<boolean>(false);

  const obtenerPato = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://random-d.uk/api/v2/random");
      const data = await response.json();
      setDuckUrl(data.url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const obtenerDato = async () => {
    try {
      const response = await fetch("/duck/pato");
      const data = await response.json();
      setFact(data.text || "No se pudo obtener el dato del día 🥲");
    } catch (error) {
      console.error(error);
      setFact("Error al cargar el dato inútil 🥲");
    }
  };

  useEffect(() => {
    obtenerPato();
    obtenerDato();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-yellow-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">🦆 Excuse My Duck</h1>
      <p className="text-center text-lg mb-6 text-gray-700 max-w-md">{fact}</p>

      {loading ? (
        <p className="text-gray-600">Cargando pato...</p>
      ) : (
        duckUrl && (
          <img
            src={duckUrl}
            alt="Pato aleatorio"
            className="rounded-2xl shadow-lg w-80 h-80 object-cover border-4 border-white"
          />
        )
      )}

      <button
        onClick={() => {
          obtenerPato();
          obtenerDato();
        }}
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
      >
        🐥 Nuevo pato y dato
      </button>

      <footer className="mt-10 text-gray-600 text-sm text-center">
        Creado con 💛 usando Random Duck API y Useless Facts API
      </footer>
    </main>
  );
}
