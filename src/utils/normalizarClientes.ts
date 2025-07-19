import type { ClienteOriginal } from "../types/Cliente";
import type { ClienteNormalizado } from "../types/Cliente";

export function normalizarClientes(raw: any): ClienteNormalizado[] {
  const clientes: ClienteOriginal[] = raw?.data?.clientes || [];

  const normalizados: ClienteNormalizado[] = clientes.map((cliente) => {
    const nome = cliente.info?.nomeCompleto || cliente.duplicado?.nomeCompleto || "Nome não informado";
    const email = cliente.info?.detalhes?.email || "Email não informado";
    const nascimento = cliente.info?.detalhes?.nascimento || "Data não informada";
    const vendas = Array.isArray(cliente.estatisticas?.vendas) ? cliente.estatisticas.vendas : [];

    return {
      nome,
      email,
      nascimento,
      vendas,
    };
  });

  return normalizados;
}
