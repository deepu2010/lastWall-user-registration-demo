import express, { Request, Response, NextFunction } from 'express';
import mysql, { Connection } from 'mysql';
import cors from 'cors';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const salt: number = 10;

interface CustomRequest extends Request {
  name?: string;
}

const app: express.Application = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['POST', 'GET'],
    credentials: true,
  })
);
app.use(cookieParser());

const db: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'new_password',
  database: 'login',
});

const verifyUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token: string | undefined = req.cookies.token;
  if (!token) {
    res.status(401).json({ Error: 'You are not authenticated' });
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
      if (err) {
        res.status(401).json({ Error: 'Token Error' });
      } else {
        req.name = (decoded as { name: string }).name;
        next();
      }
    });
  }
};

app.get('/', verifyUser, (req: CustomRequest, res: Response): void => {
  res.json({ Status: 'Success', name: req.name });
});

app.post('/register', (req: Request, res: Response): void => {
  const sql: string =
    'INSERT INTO login (`name`, `email`, `password`) VALUES (?)';
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) res.status(500).json({ Error: 'Error for hashing password' });
    const values: any[] = [req.body.name, req.body.email, hash];
    db.query(sql, [values], (err, result) => {
      if (err)
        res.status(500).json({ Error: 'Inserting data Error in server', err });
      res.json({ Status: 'Success' });
    });
  });
});

app.post('/login', (req: Request, res: Response): void => {
  const sql: string = 'SELECT * from login WHERE email = ?';
  db.query(sql, [req.body.email], (err, data) => {
    if (err) res.status(500).json({ Error: 'Login Error' });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) res.status(500).json({ Error: 'Password compare error' });
          if (response) {
            const name: string = data[0].name;
            const token: string = jwt.sign({ name }, 'jwt-secret-key', {
              expiresIn: '1d',
            });
            res.cookie('token', token);
            res.json({ Status: 'Success' });
          } else {
            res.status(401).json({ Error: 'Password not matched' });
          }
        }
      );
    } else {
      res.status(401).json({ Error: 'No email existed' });
    }
  });
});

app.get('/logout', (req: Request, res: Response): void => {
  res.clearCookie('token');
  res.json({ Status: 'Success' });
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ Error: 'Internal Server Error' });
});

app.listen(8081, () => {
  console.log('Running...');
});
