import { PublicKey } from "@solana/web3.js";
import { program } from '../config';
import * as anchor from '@coral-xyz/anchor';
import { PROGRAM_ID } from "../types/programId";
import { findClaimStatus } from "../utils";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { JUP } from "../constants";

export const newClaimIx = async (claimant: PublicKey, merkleTree: PublicKey, proof: number[][], amountToClaim: number) => {
    let [claimStatus] = findClaimStatus(claimant, merkleTree, PROGRAM_ID);

    let jupAta = getAssociatedTokenAddressSync(JUP, claimant);
    let tokenVault = getAssociatedTokenAddressSync(JUP, merkleTree, true);

    let accounts = {
        distributor: merkleTree,
        claimStatus: claimStatus,
        from: tokenVault,
        to: jupAta,
        claimant: claimant,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId
    };

    let ix: any = await program.methods.newClaim(        
        new anchor.BN(amountToClaim.toString()),
        new anchor.BN("0"),
        proof
    )
    .accounts(accounts)
    .instruction();

    return ix;
};