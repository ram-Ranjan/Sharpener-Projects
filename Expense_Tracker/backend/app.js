const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/expenses', expenseRoutes); // Note the change here

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => {
  console.log('Error: ', err);
});
