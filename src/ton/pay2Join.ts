import { beginCell } from "@ton/core";

export const PAY2JOIN_DEFAULT_PRICE_TON = "0.5";
export const PAY2JOIN_BUY_ACCESS_OP = 0x4f0b7a11;

function bytesToBase64(bytes: Uint8Array): string {
  // btoa expects "binary string" (latin1). Chunk to avoid call stack limits.
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export function buildBuyAccessPayloadBase64(queryId: bigint = 0n): string {
  const cell = beginCell()
    .storeUint(PAY2JOIN_BUY_ACCESS_OP, 32)
    .storeUint(queryId, 64)
    .endCell();

  const boc = cell.toBoc({ idx: false });
  return bytesToBase64(boc);
}
