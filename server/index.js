const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "02fd49278f881f546ea07957c288568aa77908ab15d0c94f24393f5f1d4a59b37b": 100, // private key: 5f0c3be7b76b88f0d960f122317a2230e123b9235360263b7456fbad72090e48
  "0390fa78f45d520dab7d02c791b37339644315a82442c5906aa3ae605637bbf5fd": 50,  // private key: cf6abf8f8ddb8b3a6c490d5be8dc009bd56a5efb017671cb88396240b0d94f62
  "0367309d9941424b3a8c715e64874e030faf9d4ed7c4871500d2f2640404849b1f": 75,  // private key: 3e496b245a5640fa0e6df3d9ff3d7a86b2e324162f04ae45c9bfa75cc3a22149
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
// get a signature from the client
// get addres from signature 
// and this will be the sender! Don't allow the sender to be sent through the request

  const { sender, recipient, amount } = req.body;

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
