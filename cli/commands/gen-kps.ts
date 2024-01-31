/**
 * This command can convert private keys exported from a wallet to keypair format
 * 
 * TO RUN:
 *      yarn gen-kps
 */

import * as fs from 'fs';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { Keypair } from '@solana/web3.js';

let allWalletsMapped: any = {
  // walletPublicKey                                privateKeyExportedFromWallet
  'JuPQbT4jvSKu2sLD6FJRD9tQhfKGNefH1Bvh6HsTDq9': '3s1Fmr4LzXXrkEMkh5Jf9cqfiJDAthui67YvgydSLTpKLKH4ZR7E8QZ1Nqdv6JuehicN977TTccqA1P5UQG2TbeX',
};

// let amountEarned = 0;
const generateKeypairFiles = async () => {
    for(let key in allWalletsMapped) {
        let secretKey = allWalletsMapped[key];
        let decodedPrivateKey = bs58.decode(secretKey);
        let readableKeypair = `[${Keypair.fromSecretKey(decodedPrivateKey).secretKey}]`;

        // This should match for the example provided
        // let encodedSecretKey = bs58.encode([143,39,232,36,4,156,121,157,152,41,88,27,32,132,109,215,148,16,24,58,153,86,144,134,216,134,207,75,155,56,249,6,4,150,27,110,208,229,191,251,9,153,91,115,200,77,31,119,75,46,73,193,226,108,100,143,183,117,89,161,55,142,116,8])

        if(allWalletsMapped[key]) {
          fs.writeFileSync(
            `./cli/keypairs/${key}.json`, readableKeypair
          );
        }
    }
}

generateKeypairFiles()