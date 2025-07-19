import { useEffect, useState } from "react";
import type { ClienteNormalizado } from "./types/Cliente";
import { normalizarClientes } from "./utils/normalizarClientes";
import { dadosMock } from "./mocks/api";
import FormCliente from "./components/FormCliente";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { GraficoVendasPorDia } from "./components/GraficoVendasPorDias";

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
              <th className="p-2 border text-center">Letra Ausente</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c, i) => {
              const destaqueVolume = c === maiorVolume;
              const destaqueMedia = c === maiorMedia;
              const destaqueFreq = c === maiorFrequencia;
              const letraFaltante = letraAusente(c.nome);

              // Definindo a cor de fundo para destacar visualmente
              let bgColor = "";
              if (destaqueVolume) bgColor = "bg-green-100";
              else if (destaqueMedia) bgColor = "bg-yellow-100";
              else if (destaqueFreq) bgColor = "bg-blue-100";

              return (
                <tr key={i} className={`${bgColor} border`}>
                  <td className="p-2 border">{c.nome}</td>
                  <td className="p-2 border">{c.email}</td>
                  <td className="p-2 border">{c.nascimento}</td>
                  <td className="p-2 border">{c.vendas.length}</td>
                  <td className="p-2 border text-center font-bold">{letraFaltante}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <GraficoVendasPorDia clientes={clientes} />
      </div>
    </>
  );
}
export default App;
