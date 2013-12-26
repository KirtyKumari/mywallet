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
  // if double encryption is enabled
  second_password: "SECRET",
  // recipients bitcoin address
  to: "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN",
  // amount to send in satoshi
  amount: 10000,
  // send from a specific bitcoin address *optional*
  from: "14D3Y424biYtx8RyJXQGtaNvDFhWGSJmxc",
  // "true" or "false" indicating whether the transaction should be sent through a shared wallet. fees apply *optional*
  shared: true,
  // transaction fee value in satoshi *optional*
  fee: 1000,
  // a public note to include with the transaction *optional*
  note: "i love you"
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

### Send Many Transactions
```javascript
sampleWallet.multiplePayments({
  // if double encryption is enabled
  second_password: "SECRET",
  // recipients bitcoin addresses and amount to send
  to: {
    "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN": 10000,
    "14D3Y424biYtx8RyJXQGtaNvDFhWGSJmxc": 10000
  },
  // send from a specific bitcoin address *optional*
  from: "12BpKnhWAVUtExZYyZGiucaaKQ56UviMYw",
  //  "true" or "false" indicating whether the transaction should be sent through a shared wallet. fees apply
  shared: true,
  // transaction fee value in satoshi *optional*
  fee: 1000,
  // a public note to include with the transaction *optional*
  note: "i love you"
}, function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "message" : "Sent To Multiple Recipients",
   *    "tx_hash" : "f322d01ad784e5deeb25464a5781c3b20971c1863679ca506e702e3e33c18e9c"
   *  }
   */
});
```

### Fetching the wallet balance
```javascript
sampleWallet.getBalance(function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "balance": 1000
   *  }
   */
});
```
