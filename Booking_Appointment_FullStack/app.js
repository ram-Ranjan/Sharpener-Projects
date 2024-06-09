const express = require('express')

const bodyParser = require('body-parser')
const sequelize = require('./util/db');
const path = require('path');
const cors = require('cors');

const app = express();

// app.set('view engine','ejs');
// app.set('views','views')
app.use(cors());

const adminRoutes = require('./routes/admin')


// app.use(bodyParser.json({extended:false}))
app.use(express.static(path.join(__dirname,'public')));

app.use('/appointments', adminRoutes);



// app.use(errorController.get404);

sequelize
.sync()
.then(result => {
    app.listen(4000)
})
.catch(err => console.log(err));