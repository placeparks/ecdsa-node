const express = require("express");
const cors = require("cors");
const utils = require("./utils/index");

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  /* Mirac Priv K: 481b7f471f3ad91d9d9c04e48660295776f2d477e57ea1e5adce67ccb98be64a */
  /* Mirac Pub  K: 04290819ee137ec19d5f76dde2d574455b977fcfbd65103ee9181d483dcd62700948bd016ee05e80ed0e0e8fd18bd47c1e817a5f81db9b4f4810174af75f05d1cd */
  "d2bdbfdbf32edff70ac4da14a876dfd074f44f5b": 100,
  /* hunny Priv K: e0a235f7a9d88e7a6bd697126f60484d089aebca6e29a39dcc485c4887c5fde9 */
  /* hunny Pub  K: 04da480f0b657898331306a4ad4cd27bb3ca2dc21e547d70d1cc0a73ce0bc8b6440b18e193a4d017566f4dbb5576452a365f69830fd123d371c97883f0bb92e3ab */
  "8ffed8b3e9c125e57e11d33e06dc183d416d36e0": 50,
  /* Bakhi Priv K: 09c7425642bd339487ba852d9c31c0de0aa4033a99c5ac6bcf57fe2e728c8af9 */
  /* Bakhi Pub  K: 04bf5e2689e729c384f4eaafac0061e77cd0280a632d9e1ce370586a06c40031173ce015abdfd9a22ae9363d02e1edcc597b6851a2c60b83e81569a27a05664781 */
  "cabfdb4645dfaef42e84cfe41fc53316f5641378": 75,
  /* ken Priv K: 5498f192f41e6c3dc02e76222b9a99ba7efb2fef17e429672b44b0b82f5df5ea */
  /* Ken pub k : 86cef445eb4f6a7bc49686e60221c83e401de240 */
  "23d0f8988648c5412e61fad2a24d84b3c1d4df7b":250,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { message, signature, recipient, amount, recoveryBit } = req.body;

  const sender = await utils.recoverAddress(message, signature, recoveryBit)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}