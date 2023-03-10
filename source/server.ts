import express, { Express } from 'express';
import morgan from 'morgan';
import db from './database/connect';
import routes from './routes/posts';


const app = express();

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
})

app.use('/', routes)

app.use((req, res, next) => {
    const error = new Error('not found')
    return res.status(404).json({
        message: error.message
    })
})

const PORT: string = process.env.PORT || "3000";

app.listen(PORT, () => {
    console.log(`The server is running on port http://localhost:${PORT}`)

    db.connectDB()
        .then(() => {
            console.log(`Database connected`);
        })
        .catch(err => {
            console.log(`db error ${err}`);
        })
});