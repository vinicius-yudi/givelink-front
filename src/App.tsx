import React, { useState } from 'react';

function App() {
  const [contador, setContador] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-4">🚀 Projeto React Rodando!</h1>
      <p className="mb-4">Clique no botão para testar o contador:</p>
      <button
        onClick={() => setContador(contador + 1)}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Contador: {contador}
      </button>
    </div>
  );
}

export default App;
