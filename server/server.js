"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mysql_1 = __importDefault(require("mysql"));
var cors_1 = __importDefault(require("cors"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var salt = 10;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['POST', 'GET'],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
var db = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'new_password',
    database: 'login',
});
var verifyUser = function (req, res, next) {
    var token = req.cookies.token;
    if (!token) {
        res.status(401).json({ Error: 'You are not authenticated' });
    }
    else {
        jsonwebtoken_1.default.verify(token, 'jwt-secret-key', function (err, decoded) {
            if (err) {
                res.status(401).json({ Error: 'Token Error' });
            }
            else {
                req.name = decoded.name;
                next();
            }
        });
    }
};
app.get('/', verifyUser, function (req, res) {
    res.json({ Status: 'Success', name: req.name });
});
app.post('/register', function (req, res) {
    var sql = 'INSERT INTO login (`name`, `email`, `password`) VALUES (?)';
    bcrypt_1.default.hash(req.body.password.toString(), salt, function (err, hash) {
        if (err)
            res.status(500).json({ Error: 'Error for hashing password' });
        var values = [req.body.name, req.body.email, hash];
        db.query(sql, [values], function (err, result) {
            if (err)
                res.status(500).json({ Error: 'Inserting data Error in server', err: err });
            res.json({ Status: 'Success' });
        });
    });
});
app.post('/login', function (req, res) {
    var sql = 'SELECT * from login WHERE email = ?';
    db.query(sql, [req.body.email], function (err, data) {
        if (err)
            res.status(500).json({ Error: 'Login Error' });
        if (data.length > 0) {
            bcrypt_1.default.compare(req.body.password.toString(), data[0].password, function (err, response) {
                if (err)
                    res.status(500).json({ Error: 'Password compare error' });
                if (response) {
                    var name_1 = data[0].name;
                    var token = jsonwebtoken_1.default.sign({ name: name_1 }, 'jwt-secret-key', {
                        expiresIn: '1d',
                    });
                    res.cookie('token', token);
                    res.json({ Status: 'Success' });
                }
                else {
                    res.status(401).json({ Error: 'Password not matched' });
                }
            });
        }
        else {
            res.status(401).json({ Error: 'No email existed' });
        }
    });
});
app.get('/logout', function (req, res) {
    res.clearCookie('token');
    res.json({ Status: 'Success' });
});
// Error Handling Middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ Error: 'Internal Server Error' });
});
app.listen(8081, function () {
    console.log('Running...');
});
