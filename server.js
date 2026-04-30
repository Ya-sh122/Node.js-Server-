const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/db');
const playerRoutes = require('./routes/playerRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/players', playerRoutes);

// sync DB
sequelize.sync().then(() => {
    console.log("Tables created");

    app.listen(3000, () => {
        console.log("Server running on 3000");
    });
});