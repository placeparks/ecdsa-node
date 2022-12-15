import { keccak256 } from "ethereum-cryptography/keccak";
import { recoverPublicKey } from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function getAddress(publicKey) {
    return keccak256(publicKey.slice(1)).slice(-20)
}

function hashMessage(message) {
    return keccak256(utf8ToBytes(message))
}

async function recoverKey(message, signature, recoveryBit) {
    return recoverPublicKey(hashMessage(message), signature, recoveryBit);
}

export default {
  getAddress,
  recoverKey,
  hashMessage,
};