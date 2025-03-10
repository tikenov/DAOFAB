const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const transactions = require('./routes/transactions');

app.use(cors())


app.use('/api/transactions', transactions.router);


const port = process.env.PORT || "5000";
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

