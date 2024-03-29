var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');
var Router = require('./routes/data');
var bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');
const { process_params } = require('express/lib/router');

var app = express();
var cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));


var loaisachRoute=require('./routes/loaisach');
app.use('/loaisach',loaisachRoute);

var sachRoute=require('./routes/sach');
app.use('/sach',sachRoute);

var hoadonbanRoute=require('./routes/hoadonban');
app.use('/hoadonban',hoadonbanRoute);

var hoadonnhapRoute=require('./routes/hoadonnhap');
app.use('/hoadonnhap',hoadonnhapRoute);

var khachhangRoute=require('./routes/khachhang');
app.use('/khachhang',khachhangRoute);

var nguoidungRoute=require('./routes/nguoidung');
app.use('/nguoidung',nguoidungRoute);

var nhaxuatbanRoute=require('./routes/nhaxuatban');
app.use('/nhaxuatban',nhaxuatbanRoute);
var tintucRoute=require('./routes/tintuc');
app.use('/tintuc',tintucRoute);

/* var chitiethoadonbanRoute=require('./routes/chitiethoadonban');
app.use('/chitiethoadonban',chitiethoadonbanRoute);

var chitiethoadonnhapRoute=require('./routes/chitiethoadonnhap');
app.use('/chitiethoadonnhap',chitiethoadonnhapRoute); */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended : false}));



app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/data',dataRouter)

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

app.use(fileUpload());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
