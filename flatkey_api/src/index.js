import express from 'express';
import mongoose from 'mongoose';
import app from './app';

mongoose.Promise = global.Promise;

// connecting with mongodb
mongoose.connect("mongodb://localhost:27017/flatkey_db", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	// starting the server		
	app.listen(app.get('port'), () => {
		console.log(`Server on port ${app.get('port')}`);
	});
}).catch((error) => {
	console.log(`It looks like there was an 
		error connecting to mongodb. Details: ${error}`);	
});
