/**
 * Comprueba que el nonce del JWT coincide con el almacenado (un solo uso lógico).
 */
export function isResetNonceValid(
  storedNonce: string | null | undefined,
  claimNonce: string,
): boolean {
  return storedNonce != null && storedNonce === claimNonce;
}
