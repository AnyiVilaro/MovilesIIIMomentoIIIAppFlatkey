import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import UserRoutes from './routes/UserRoutes';
import PropertyRoutes from './routes/PropertyRoutes';

const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// middlewares. Esto es para logs de eventos sobre la api. dev/combined
app.use(morgan('dev'));
app.use(urlencoded({extended: false}));
app.use(json());

// routes
app.use('/api/user', UserRoutes);
app.use('/api/property', PropertyRoutes);


module.exports = app;
