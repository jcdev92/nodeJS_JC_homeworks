//? Dependencies
const express = require('express');
const database = require('./utils/database');
const initModels = require('./models/initModels');

//? Files
const {port} = require('./config');
const usersRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');
const categoriesRouter = require('./categories/catgeories.router');
const postsRouter = require('./posts/posts.router');

//? Initial Configs
const app = express();


database.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

database.sync()
    .then(() => console.log('Database synced...'))
    .catch(err => console.log('Error: ' + err));

initModels();

//? Middlewares
app.use(express.json());

//? Routes
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/posts', postsRouter);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!', users: `localhost:${port}/api/v1/users`});
});

//? Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});