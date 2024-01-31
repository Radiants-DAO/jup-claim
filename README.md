# JUP Claim

## Requirements
- Node, ts-node, typescript, package manager
- Run `yarn install` or `npm i` etc
- change `.env.local` to `.env` and replace wallet location + add RPC URL

### Step 1: Find Wallets that have JUP allocated

### Step 2: Find proofs
- Copy the offical claim-proof URL:
- https://worker.jup.ag/jup-claim-proof/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN/
- Add your wallet Public Key to the end
- Copy the text that displays
- Save it in allProofs.ts with a key of the wallet Public Key, and value of the text from the website

### Step 3: Edit claim-jup
- Add the publicKey, and path to keypair into the list

### Step 4: Claim!
- Run `yarn claim-jup`

### Optional: Generate Keypairs
- If you only have private keys and not keypairs, you can generate them with a script `gen-kps` or you can change the way you are constructing the signer and keypair in the script itself.

### Optional: Claim JUP to third party wallet
- Added `claim-jup-surrogate` to allow users to claim from all wallets and send to one common wallet

### Optional: Generate Distributors from Program
- Added `gen-distributors` to pull all contract data in for funsies, I will remove this from the commit but you are free to generate them if you would like!