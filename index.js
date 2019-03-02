/* eslint no-process-env: 0 */
require('dotenv').config();
const config = require('config'),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express();

if(!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
}

const UserService = require('./service/UserService');
const UserController = require('./controller/UserController');
const UserRouter = require('./routes/UserRouter');
const user = new UserController(new UserService());

const AuthService = require('./service/AuthService');
const AuthController = require('./controller/AuthController');
const AuthRouter = require('./routes/AuthRouter');
const auth = new AuthController(new AuthService());

mongoose
    .connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('Connected to db...'))
    .catch((err) => console.error('Could not connect to the db...', err));

app.use(express.json());
app.use('/users', UserRouter(user));
app.use('/auth', AuthRouter(auth));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}...`));
