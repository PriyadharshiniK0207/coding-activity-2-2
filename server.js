const express = require("express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const app = express();

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
    books: [],
    accounts: []
}).write();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Express Server is Running Successfully!");
});

// GET all accounts
app.get("/accounts", (req, res) => {
    res.json(db.get("accounts").value());
});

// POST a new account
app.post("/accounts", (req, res) => {
    const account = {
        id: Date.now(),
        ...req.body
    };

    db.get("accounts")
        .push(account)
        .write();

    res.status(201).json(account);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
