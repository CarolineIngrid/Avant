import type { ClienteOriginal } from "../types/Cliente";
import type { ClienteNormalizado } from "../types/Cliente";

export function normalizarClientes(raw: any): ClienteNormalizado[] {
  const clientes: ClienteOriginal[] = raw?.data?.clientes || [];

  return clientes.map((cliente) => {
    return {
      nome: cliente.info?.nomeCompleto || cliente.duplicado?.nomeCompleto || "Nome não informado",
      email: cliente.info?.detalhes?.email || "Email não informado",
      nascimento: cliente.info?.detalhes?.nascimento || "Data não informada",
      vendas: cliente.estatisticas?.vendas || [],
    };
  });
}
