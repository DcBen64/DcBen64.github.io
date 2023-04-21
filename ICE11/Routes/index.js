"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/home', (req, res, next) => {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/projects', (req, res, next) => {
    res.render('index', { title: 'Projects', page: 'projects', displayName: '' });
});
router.get('/contact', (req, res, next) => {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: '' });
});
router.get('/login', (req, res, next) => {
    res.render('index', { title: 'Login', page: 'login', displayName: '' });
});
router.get('/register', (req, res, next) => {
    res.render('index', { title: 'Register', page: 'register', displayName: '' });
});
router.get('/contact-list', (req, res, next) => {
    res.render('index', { title: 'Contact-List', page: 'contact-list', displayName: '' });
});
router.get('/edit', (req, res, next) => {
    res.render('index', { title: 'Edit Contact', page: 'edit', displayName: '' });
});
exports.default = router;
//# sourceMappingURL=index.js.map