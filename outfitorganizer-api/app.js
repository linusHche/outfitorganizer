const app = require('express')();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/api', require('./server'));
app.listen(3000, () => console.log('Server has started!'));
