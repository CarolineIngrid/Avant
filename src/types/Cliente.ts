export type Venda = {
  data: string; // ISO string
  valor: number;
};

export type ClienteOriginal = {
  info: {
    nomeCompleto: string;
    detalhes: {
      email: string;
      nascimento: string;
    };
  };
  estatisticas?: {
    vendas: Venda[];
  };
  duplicado?: {
    nomeCompleto: string;
  };
};

export type ClienteNormalizado = {
  nome: string;
  email: string;
  nascimento: string;
  vendas: {
    data: string;
    valor: number;
  }[];
};
