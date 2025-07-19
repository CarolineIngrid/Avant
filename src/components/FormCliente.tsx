// src/components/FormCliente.tsx
import { useState } from "react";

type FormClienteProps = {
  onAdd: (cliente: { nome: string; email: string; nascimento: string }) => void;
};

export default function FormCliente({ onAdd }: FormClienteProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [nascimento, setNascimento] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !nascimento) {
      alert("Preencha todos os campos!");
      return;
    }
    onAdd({ nome, email, nascimento });
    setNome("");
    setEmail("");
    setNascimento("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded max-w-md">
      <h2 className="text-xl font-semibold mb-4">Adicionar Cliente</h2>

      <label className="block mb-2">
        Nome:
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-2">
        E-mail:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-4">
        Data de nascimento:
        <input
          type="date"
          value={nascimento}
          onChange={(e) => setNascimento(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Adicionar
      </button>
    </form>
  );
}
