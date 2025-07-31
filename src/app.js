const express = require('express');
const {connectToDatabase} = require('./config/database');
//const cors = require('cors');
const setRoutes = require('./routes/stockRoutes');
//const setRoutes = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
connectToDatabase()
    .then(()=>{
        console.log('Connected to the database successfully');
        setRoutes(app);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        
    });