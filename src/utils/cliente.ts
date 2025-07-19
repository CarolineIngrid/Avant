// src/utils/clientes.ts
import type { ClienteNormalizado } from "../types/Cliente";

export function clienteMaiorVolume(clientes: ClienteNormalizado[]) {
  return clientes.reduce((maior, atual) => {
    const somaAtual = atual.vendas.reduce((acc, v) => acc + v.valor, 0);
    const somaMaior = maior ? maior.vendas.reduce((acc, v) => acc + v.valor, 0) : 0;
    return somaAtual > somaMaior ? atual : maior;
  }, null as ClienteNormalizado | null);
}

export function clienteMaiorMedia(clientes: ClienteNormalizado[]) {
  return clientes.reduce((maior, atual) => {
    const mediaAtual = atual.vendas.length > 0
      ? atual.vendas.reduce((acc, v) => acc + v.valor, 0) / atual.vendas.length
      : 0;
    const mediaMaior = maior && maior.vendas.length > 0
      ? maior.vendas.reduce((acc, v) => acc + v.valor, 0) / maior.vendas.length
      : 0;
    return mediaAtual > mediaMaior ? atual : maior;
  }, null as ClienteNormalizado | null);
}

export function clienteMaiorFrequencia(clientes: ClienteNormalizado[]) {
  return clientes.reduce((maior, atual) => {
    const freqAtual = atual.vendas.length;
    const freqMaior = maior ? maior.vendas.length : 0;
    return freqAtual > freqMaior ? atual : maior;
  }, null as ClienteNormalizado | null);
}

export function letraAusente(nome: string) {
  const alfabeto = "abcdefghijklmnopqrstuvwxyz";
  const nomeLower = nome.toLowerCase();

  for (const letra of alfabeto) {
    if (!nomeLower.includes(letra)) {
      return letra;
    }
  }
  return "-";
}
