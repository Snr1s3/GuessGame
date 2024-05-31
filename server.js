const express = require('express');
const fs = require('fs');

const app = express();
const port = 3007;

app.use(express.static('web'));
app.get("/", (req, res) => {
res.sendFile(__dirname + '/web/index.html');
});

//PORT
app.listen(port, () => {
console.log(`Server running at http://localhost:${port}/`);
});