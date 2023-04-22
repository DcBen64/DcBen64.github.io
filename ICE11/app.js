const mongoose = require('mongoose');
require('dotenv').config();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./Routes/index"));
const users_1 = __importDefault(require("./Routes/users"));
const contactsRouter = require('./Routes/contacts');
const app = (0, express_1.default)();
app.set('views', path_1.default.join(__dirname, 'Views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'Client')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'node_modules')));
app.use('/', index_1.default);
app.use('/users', users_1.default);
// Include and use routes
const routes = require('./Routes/conConnect');
app.use('/', routes);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
// Replace the following URL with your MongoDB connection string.
// If you're using a local MongoDB instance, the URL will be 'mongodb://localhost/your_database_name'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/BMWeb';
// Include and use routes

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

exports.default = app;
//# sourceMappingURL=app.js.map