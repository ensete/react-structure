export type TxObject = {
  from: string,
  to: string,
  value: string,
  data: string,
  nonce?: string,
  gasPrice?: string,
  gas?: string,
}

export type BroadcastedTx = {
  hash: string,
  type: number,
  status: string,
  onSuccess?: any,
  onFailed?: any,
  onDone?: any
}
