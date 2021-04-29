import { Tx } from "src/app/types/tx-type";

export function createTxObject(data: any): Tx {
  return {
    from: data.from,
    to: data.to,
    value: data.value,
    data: data.data,
    nonce: data.nonce,
    gasPrice: data.gasPrice,
    gas: data.gas
  };
}