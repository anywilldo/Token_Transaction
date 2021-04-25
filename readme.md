## ERC20 Transaction 

- Create wallet with mnemonic
- Issue token to created wallet
- Approve sender allowance
- Transfer wallet token to another address

#### Environment Variables and Install Dependencies
Check .env.sample for variables needed based on local network or testnet
```ssh
yarn install
```

##### Local Truffle network
On terminal run
```ssh
truffle build
```
Truffle terminal
```truffle develop```
```migrate --reset```

##### Create Account 
On terminal run
```ssh
node createAccount.js
```
Create Account and details saved on to root file 

##### Issue Token from Contract
In file issueToken.js
Update Variable ```tokenAmount``` as needed
On terminal run
```ssh
node issueToken.js
```
##### Approve Sender and token amount for transfer
In file approveSender.js
Update Variable ```tokenAmount``` as needed
On terminal run
```ssh
node approveSender.js
```
##### Transfer token to another address
In file transferToken.js
Update Variable ```tokenAmount``` and ```receiverAddress``` as needed
On terminal run
```ssh
node transferToken.js
```

