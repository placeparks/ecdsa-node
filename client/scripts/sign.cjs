const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

function hashMessage(message) {
  return keccak256(utf8ToBytes(message))
}

async function signMessage(message, privateKey) {
  return await secp.sign(hashMessage(message), privateKey, { recovered: true });
}

(async function() {

  try {
    const [message, privateKey] = process.argv.slice(2)

    if (!message || !privateKey) {
      throw new Error('Pass message and private key arguments to script please!')
    }

    const [messageHash, recoveryBit] = await signMessage(message, privateKey);
    console.log('signed message: \n', toHex(messageHash))
    console.log('recovery bit:', recoveryBit)

  } catch (error) {
    console.error(error?.message || error)
  }

})();