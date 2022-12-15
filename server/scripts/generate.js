const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { getAddress } = require("../utils/index");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey).slice(-20);

console.log('private key:', toHex(privateKey));
console.log('public key:', toHex(publicKey));
console.log('address:', toHex(getAddress(publicKey)));