/**
 * This command creates a newClaimTx for all wallets specified
 *
 * TO RUN:
 *      yarn claim-jup
 */

import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import fs from 'fs';
import * as anchor from '@coral-xyz/anchor';
import { createAssociatedTokenAccountInstruction, createTransferCheckedInstruction, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { newClaimIx } from "../ix/new-claim";
import {proofs} from '../proofs/allProofs';
import { JUP } from "../constants";

const runInstruction = async () => {
    console.log("Beginning Claim Script")

    let txs: any = [];

    let proofsCopy: any = proofs;

    let kpMatch: any = {
        'JuPQbT4jvSKu2sLD6FJRD9tQhfKGNefH1Bvh6HsTDq9': 'keypairs/JuPQbT4jvSKu2sLD6FJRD9tQhfKGNefH1Bvh6HsTDq9.json',
    };

    for(let item in proofsCopy) {

        console.log("Wallet Claiming: ", item)

        let oneClaimData = proofsCopy[item];

        let kp = fs.readFileSync(`./cli/keypairs/${kpMatch[item]}`, {encoding: 'utf-8'});
        
        let claimant = new PublicKey(item);
        let signer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(kp)));
        
        let provider = new anchor.AnchorProvider(new Connection("rpc-goes-here"), new anchor.Wallet(signer), {commitment: "confirmed"})

        // distributor
        let merkleTree = new PublicKey(oneClaimData.merkle_tree);
        // proof
        let proof = oneClaimData.proof;
        // amount of tokens (6 decimals)
        let amountToClaim = oneClaimData.amount;
        let claimantAta = getAssociatedTokenAddressSync(JUP, claimant);


        let claimIx = await newClaimIx(claimant, merkleTree, proof, amountToClaim);

        let claimTx = new Transaction();

        // Add compute and fee
        const modifyComputeUnits =
          anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 100_000 });
        const addPriorityFee =
          anchor.web3.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 10_000 });

        claimTx.add(modifyComputeUnits);
        claimTx.add(addPriorityFee);

        claimTx.add(createAssociatedTokenAccountInstruction(claimant, claimantAta, claimant, JUP));
        claimTx.add(claimIx);

        // add transfer to single destination wallet
        let destinationWallet = fs.readFileSync(`./cli/keypairs/JuPQbT4jvSKu2sLD6FJRD9tQhfKGNefH1Bvh6HsTDq9.json`, {encoding: 'utf-8'});
        let destinationSigner = Keypair.fromSecretKey(new Uint8Array(JSON.parse(destinationWallet)));
        const destinationAta = getAssociatedTokenAddressSync(JUP, destinationSigner.publicKey);

        claimTx.add(createTransferCheckedInstruction(claimantAta, JUP, destinationAta, claimant, amountToClaim, 6));
        claimTx.feePayer = destinationSigner.publicKey;

        let finalTx = await provider.sendAndConfirm(claimTx, [destinationSigner], {skipPreflight: true});
        if(finalTx) {
            txs.push(finalTx);
        } else {
            console.log("error");
        }
    }

    return {
        txs
    };
};

runInstruction()
    .catch((error) => console.log(`Error: ${error}`))
    .then((result) => {
        if (result) {
            console.log(`${result.txs.length} Transactions Successful`)
        }
    });