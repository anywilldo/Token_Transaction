const Web3 = require("web3");
var abi = require('./abi.json');
require('dotenv').config()
const NODE_ADDRESS = process.env.NETWORK;
const PRIVATE_KEY  = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const USER_ADDRESS = process.env.ADDRESS

// Update amount for transfer transaction if needed
const approveAmount = 1000
// Update Node Gas Price if needed to
// let nodeGasPrice = 1000000
let nodeGasPrice 


async function send(web3, account, transaction) {
    while (true) {
        try {
            const options = {
                to: transaction._parent._address,
                data: transaction.encodeABI(),
                gas: await transaction.estimateGas({from: account.address}),
                gasPrice: nodeGasPrice || await web3.eth.getGasPrice()
            };
            const signed  = await web3.eth.accounts.signTransaction(options, account.privateKey);
            const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
            return receipt;
        }
        catch (error) {
            console.log(error.message);
        }
    }
}

async function run() {
    const web3 = new Web3(NODE_ADDRESS);
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    const transaction = contract.methods.approve(USER_ADDRESS, approveAmount);
    const receipt = await send(web3, account, transaction);
    console.log(JSON.stringify(receipt, null, 4));
}

run();
