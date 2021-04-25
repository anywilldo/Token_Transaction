const Web3 = require("web3");
var abi = require('./abi.json');
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '../') + '/.env'})
const NODE_ADDRESS = process.env.NETWORK;
const PRIVATE_KEY  = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const USER_ADDRESS = process.env.ADDRESS
const receiverAddress = '0xE3D87f1e33249309Eb1c085951eF638d9c5131C2'
// Update amount for transfer transaction if needed
const transferAmount = 1000

// Update Node Gas Price if needed to
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
            const receipt = await getTransactionReceipt(web3);
            if (receipt)
                return receipt;
        }
    }
}

async function run() {
    const web3 = new Web3(NODE_ADDRESS);
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    const transaction = contract.methods.transferFrom(USER_ADDRESS, receiverAddress, transferAmount);
    const receipt = await send(web3, account, transaction);
    console.log(JSON.stringify(receipt, null, 4));
}

run();
