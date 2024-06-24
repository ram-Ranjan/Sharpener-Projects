const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/db');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');

app.use('/appointments', adminRoutes);

sequelize
    .sync({ force: true }) // Be careful with {force: true} in production!
    .then(() => {
        console.log('Database & tables created!');
        app.listen(4000, () => {
            console.log('Server running on port 4000');
        });
    })
    .catch(err => console.log(err));