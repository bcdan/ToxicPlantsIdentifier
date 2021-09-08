const express = require('express');
const app = express();
const port = 5000;

app.use('/api',require('./routes/index'));

app.listen(port,console.log(`Server is listening on port ${port}`));


