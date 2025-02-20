const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use('/api/tasks', require('./Routes/getAllTasks'));



// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
