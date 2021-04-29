import { TxObject } from "src/app/types/txType";

export function createTxObject(data: any): TxObject {
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