import { PublicKey } from '@solana/web3.js';

export const findClaimStatus = (
    claimant: PublicKey,
    merkleTree: PublicKey,
    programId: PublicKey
): [PublicKey, number] => {
    return PublicKey.findProgramAddressSync([
        Buffer.from("ClaimStatus"),
        claimant.toBuffer(),
        merkleTree.toBuffer()
    ], programId)
}