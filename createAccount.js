const bip39 = require('bip39')
const ethers = require("ethers");
const fs = require('fs');

const newWallet = async () => {
    const mnemonic = bip39.generateMnemonic()
    const address = ethers.Wallet.fromMnemonic(mnemonic)
    
    fs.writeFile(`wallet-${address.address}.json`, JSON.stringify({
        mnemonic,
        address,
        privateKey: address.privateKey,
        publicKey: address.publicKey
    },null, 4), function (err) {
        if (err) throw err;
        console.log(`Wallet is created successfully in root file.`);
      });
      
};

newWallet()
