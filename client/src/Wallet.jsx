import server from "./server";
import utils from "../utils/index.js";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, publicKey, setPublicKey }) {
  async function onChange(evt) {
    const publicKey = evt.target.value;
    const address = toHex(utils.getAddress(hexToBytes(publicKey)));
    setPublicKey(publicKey);
    setAddress(address);
    if (publicKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Public Key:
        <input placeholder="Type a public key" value={publicKey} onChange={onChange}></input>
      </label>

      <div>Address: {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;