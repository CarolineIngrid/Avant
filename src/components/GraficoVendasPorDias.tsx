import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Venda = {
  data: string;
  valor: number;
};

type ClienteNormalizado = {
  nome: string;
  email: string;
  nascimento: string;
  vendas: Venda[];
};

type Props = {
  clientes: ClienteNormalizado[];
};

export function GraficoVendasPorDia({ clientes }: Props) {
  // Agrupa todas as vendas por data e soma os valores
  const dadosAgrupados = useMemo(() => {
    const mapa: Record<string, number> = {};

    clientes.forEach((cliente) => {
      cliente.vendas.forEach(({ data, valor }) => {
        if (!mapa[data]) {
          mapa[data] = 0;
        }
        mapa[data] += valor;
      });
    });

    // Transforma em array ordenado por data
    return Object.entries(mapa)
      .map(([data, valor]) => ({ data, valor }))
      .sort((a, b) => a.data.localeCompare(b.data));
  }, [clientes]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosAgrupados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip formatter={(value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} />
        <Line type="monotone" dataKey="valor" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
