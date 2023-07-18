const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');
const tourRouter = require('./src/routes/tourRoute');
const userRouter = require('./src/routes/userRoute');
const authRouter = require('./src/routes/authRoute');


const app = express()

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/tour', tourRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)

connectDB()
// Start the server
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
