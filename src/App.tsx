import { useEffect, useState } from "react";
import type { ClienteNormalizado } from "./types/Cliente";
import { normalizarClientes } from "./utils/normalizarClientes";
import { dadosMock } from "./mocks/api";
import FormCliente from "./components/FormCliente";
import Navbar from "./components/Navbar";

function App() {
  const [clientes, setClientes] = useState<ClienteNormalizado[]>([]);

  useEffect(() => {
    const data = normalizarClientes(dadosMock);
    setClientes(data);
  }, []);

  const adicionarCliente = (novo: {
    nome: string;
    email: string;
    nascimento: string;
  }) => {
    setClientes((old) => [
      ...old,
      { ...novo, vendas: [] }, // novo cliente começa sem vendas
    ]);
  };

  return (
    <>
    <Navbar />
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Clientes</h1>

      <FormCliente onAdd={adicionarCliente} />

      <table className="table-auto w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">E-mail</th>
            <th className="p-2 border">Nascimento</th>
            <th className="p-2 border">Vendas</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c, i) => (
            <tr key={i} className="border">
              <td className="p-2 border">{c.nome}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.nascimento}</td>
              <td className="p-2 border">{c.vendas.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </>
  );
}

export default App;
