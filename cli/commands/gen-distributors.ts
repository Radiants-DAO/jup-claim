/**
 * This command parses contract data and saves needed info from each distributor
 *
 * TO RUN:
 *      yarn gen-distributors
 */

import { program } from '../config';
import fs from 'fs';

const runInstruction = async () => {
    let distributors: any = [];

    let trees = await program.account.merkleDistributor.all();
    
    for(let i = 0; i < trees.length; i++) {
        let getData = trees[i];

        let parsedData = {
            id: getData.publicKey.toString(),
            bump: getData.account.bump,
            version: Number(getData.account.version),
            root: getData.account.root,
            mint: getData.account.mint.toString(),
            tokenVault: getData.account.tokenVault.toString(),
            maxTotalClaim: Number(getData.account.maxTotalClaim),
            maxNumNodes: Number(getData.account.maxNumNodes),
            totalAmountClaimed: Number(0),
            numNodesClaimed: Number(0),
            startTs: Number(getData.account.startTs),
            endTs: Number(getData.account.endTs),
            clawbackStartTs: Number(getData.account.clawbackStartTs),
            clawbackReciever: getData.account.clawbackReceiver.toString(),
            admin: getData.account.admin.toString(),
            clawedBack: getData.account.clawedBack,
            enableSlot: Number(getData.account.enableSlot),
            closable: getData.account.closable,
            buffer0: getData.account.buffer0,
            buffer1: getData.account.buffer1,
            buffer2: getData.account.buffer2
        }

        distributors.push(parsedData);
        fs.writeFileSync(`./cli/distributors/${getData.publicKey.toString()}.json`, JSON.stringify(parsedData));
    }
        fs.writeFileSync(`./cli/distributors/allDistributors.json`, JSON.stringify(distributors));
    return {
        distributors
    };
};

runInstruction()
    .catch((error) => console.log(`Error: ${error}`))
    .then((result) => {
        if (result) {
            console.log("Success")
            console.log("Distributor Count: ", result.distributors.length)
        }
    });