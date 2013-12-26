myWallet
========

blockchain.info My Wallet API for node.js

Documentation
=============

```javascript
var myWallet = require("myWallet");
var sampleWallet = new myWallet({
  guid: "SECRET",
  password: "SECRET"
});
```

### Make Outgoing Payments
```javascript
sampleWallet.payment({
  second_password: "SECRET", // if double encryption is enabled
  to: "1M8zfjMHvX6Yg8Dob4odt4AkpNfU2yCvQG", // recipients bitcoin address
  amount: 10000, // amount to send in satoshi
  from: "1M8zfjMHvX6Yg8Dob4odt4AkpNfU2yCvQG", // send from a specific bitcoin address *optional*
  shared: true, // "true" or "false" indicating whether the transaction should be sent through a shared wallet. fees apply *optional*
  fee: 1000, // transaction fee value in satoshi *optional*
  note: "i love you" // a public note to include with the transaction *optional*
}, function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "message": "Sent 0.1 BTC to 1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq",
   *    "tx_hash": "f322d01ad784e5deeb25464a5781c3b20971c1863679ca506e702e3e33c18e9c",
   *    "notice": "Some funds are pending confirmation and cannot be spent yet (Value 0.001 BTC)"
   *  }
   */
});
```
