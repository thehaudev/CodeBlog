var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import { route } from "./routes/index"
var app = express();
var mongoose = require('mongoose')
require('dotenv').config()
const { MONGODB_URL } = process.env
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.set({
  'strictQuery': false
})
mongoose.connect(MONGODB_URL)
  .then(console.log("Connected"))
  .catch((err: any) => console.log("don't connect"))

route(app)



// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // console.log(err.message, req.app.get('env') === 'development' ? err : {}, err.status || 500)
  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message, error: req.app.get('env') === 'development' ? err : {} })
  // res.render('error')
});
app.listen(3000, () => console.log("Server ready at: http://localhost:3000"));

module.exports = app;
