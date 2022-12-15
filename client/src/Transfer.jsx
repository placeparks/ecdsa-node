import { useState } from "react";
import server from "./server";

function Transfer({
  address,
  setBalance,
}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        amount: parseInt(sendAmount),
        recipient, // address form, not public key
        message,
        signature,
        recoveryBit: parseInt(recoveryBit),
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  function onChangeSendAmount(evt) {
    const amount = evt.target.value;
    setSendAmount(amount)
    setMessage(`${amount} from ${address} to ${recipient}`)
  }

  function onChangeRecipient(evt) {
    const recipient = evt.target.value;
    setRecipient(recipient)
    setMessage(`${sendAmount} from ${address} to ${recipient}`)
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={onChangeSendAmount}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={onChangeRecipient}
        ></input>
      </label>

      <div>Message to sign: {message}</div>

      <label>
        Signature
        <input
          placeholder="Type resulting signature from signed message"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>

      <label>
        Recovery Bit
        <input
          placeholder="Type resulting recovery bit from signed message"
          value={recoveryBit}
          onChange={setValue(setRecoveryBit)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;