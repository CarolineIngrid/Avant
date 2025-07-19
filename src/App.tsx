import { useEffect, useState } from "react";
import type { ClienteNormalizado } from "./types/Cliente";
import { normalizarClientes } from "./utils/normalizarClientes";
import { dadosMock } from "./mocks/api";
import FormCliente from "./components/FormCliente";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { GraficoVendasPorDia } from "./components/GraficoVendasPorDias";
import "./App.css";

import { 
  clienteMaiorVolume, 
  clienteMaiorMedia, 
  clienteMaiorFrequencia, 
  letraAusente,
} from "./utils/cliente";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [clientes, setClientes] = useState<ClienteNormalizado[]>([]);

   // Calcular os clientes destacados
  const maiorVolume = clienteMaiorVolume(clientes);
  const maiorMedia = clienteMaiorMedia(clientes);
  const maiorFrequencia = clienteMaiorFrequencia(clientes);

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    setToken(savedToken);
  }, []);

  // só busca clientes se estiver autenticado
  useEffect(() => {
    if (token) {
      const data = normalizarClientes(dadosMock);
      setClientes(data);
    }
  }, [token]);

  const handleLogin = (newToken: string) => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
  };

  const adicionarCliente = (novo: {
    nome: string;
    email: string;
    nascimento: string;
  }) => {
    setClientes((old) => [
      ...old,
      { ...novo, vendas: [] },
    ]);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  const handleLogout = () => {
  localStorage.removeItem("auth_token");
  setToken(null); // isso vai forçar a volta pro <Login />
};


return (
  <>
    <Navbar onLogout={handleLogout} />
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Preencha o Formulário:</h1>

      <div className="mb-10 bg-white rounded-xl shadow p-6">
        <FormCliente onAdd={adicionarCliente} />
      </div>

      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-500 uppercase text-xs font-semibold">
              <th className="pl-6 py-3">Nome</th>
              <th className="py-3">E-mail</th>
              <th className="py-3">Nascimento</th>
              <th className="py-3">Vendas</th>
              <th className="py-3 pr-6 text-center">Letra Ausente</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c, i) => {
              const destaqueVolume = c === maiorVolume;
              const destaqueMedia = c === maiorMedia;
              const destaqueFreq = c === maiorFrequencia;
              const letraFaltante = letraAusente(c.nome);

              let bgColor = "";
              if (destaqueVolume) bgColor = "bg-green-100";
              else if (destaqueMedia) bgColor = "bg-yellow-100";
              else if (destaqueFreq) bgColor = "bg-blue-100";

              return (
                <tr
                  key={i}
                  className={`rounded-xl shadow-sm hover:shadow-md transition-shadow ${bgColor}`}
                >
                  <td className="py-3 px-6 text-gray-800 font-semibold rounded-l-xl">
                    {c.nome}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{c.email}</td>
                  <td className="py-3 px-4 text-gray-600">{c.nascimento}</td>
                  <td className="py-3 px-4 text-gray-700">{c.vendas.length}</td>
                  <td className="py-3 px-4 text-center rounded-r-xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-sm font-bold text-gray-700">
                      {letraFaltante}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-12">
        <GraficoVendasPorDia clientes={clientes} />
      </div>
    </main>
  </>
);

  
}
export default App;
