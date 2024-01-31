/**
 * This command is not working, the secret is found at 
 * https://worker.jup.ag/jup-claim-proof/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN/walletPublicKey
 * TO RUN:
 *      yarn gen-proofs
 */

import * as fs from 'fs';
import {proofs} from '../proofs/allProofs';

let proofCopy: any = proofs;

let allWalletsMapped: any = {
  // walletPublicKey                                nameOfKeypairFile
  'JuPQbT4jvSKu2sLD6FJRD9tQhfKGNefH1Bvh6HsTDq9': 'JuPQbT4jvSKu2sLD6FJRD9tQhfKGNefH1Bvh6HsTDq9',
};

// let amountEarned = 0;
const fetchProofs = async () => {
    for(let key in proofCopy) {
        proofCopy[key]["wallet"] = key;
        if(allWalletsMapped[key]) {
          fs.writeFileSync(
            `./cli/proofs/${allWalletsMapped[key]}.json`, JSON.stringify(proofCopy[key])
          );
        }
    }
}

fetchProofs()