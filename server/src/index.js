import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {version} from '../package.json'
import WebSocketServer, {Server} from 'ws';
import AppRouter from './app-router'
import Model from './models'
import Database from './database'
import path from 'path'

const PORT = process.env.PORT || 3000;
const app = express();
app.server = http.createServer(app);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'app/build')));

//app.use(morgan('dev'));


app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));



app.wss = new Server({
	server: app.server
});


// static www files use express
const wwwPath = path.join(__dirname, 'www');

app.use('/', express.static(wwwPath));

// Connect to Mongo Database

new Database().connect().then((db) => {

	console.log("Successful connected to database.")

	app.db = db;
	
}).catch((err) => {


	throw(err);
});


// End connect to Mongodb Database

app.models = new Model(app);
app.routers = new AppRouter(app);





app.server.listen(process.env.PORT || PORT, () => {
        console.log(`App is running on port ${app.server.address().port}`);
});

export default app;