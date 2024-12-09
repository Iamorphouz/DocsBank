const express = require('express');
const userRouter = require('./routes/user.routes');
const indexRouter = require('./routes/index.routes');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const connectToDB = require('./config/db');
connectToDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/user', userRouter);

process.on('uncaughtException', (err) => {
	console.log('Uncaught Exception');
	console.log(err);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
