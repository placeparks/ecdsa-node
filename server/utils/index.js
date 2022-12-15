const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, hexToBytes, toHex } = require("ethereum-cryptography/utils");

function getAddress(publicKey) {
    return keccak256(publicKey.slice(1)).slice(-20)
}

function hashMessage(message) {
    return keccak256(utf8ToBytes(message))
}

async function recoverAddress(message, signature, recoveryBit) {
  const publicKey = secp.recoverPublicKey(
    hashMessage(message),
    hexToBytes(signature),
    recoveryBit
  );

  return toHex(getAddress(publicKey))
}

module.exports = {
  getAddress,
  recoverAddress,
  hashMessage,
};