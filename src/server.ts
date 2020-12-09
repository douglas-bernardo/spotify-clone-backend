import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
    'mongodb://localhost:27017/spotify', 
    { useUnifiedTopology: true ,useNewUrlParser: true, useFindAndModify: false }
);

app.use(routes);

app.listen(3333);
