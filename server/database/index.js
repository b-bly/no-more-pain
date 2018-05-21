//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//your local database url
//27017 is the default mongoDB port
let MONGO_URL;
const MONGO_LOCAL_URL = 'mongodb://localhost:27017/no-more-pain'

if (process.env.MONGODB_URI) {
	MONGO_URL = process.env.MONGODB_URI
} else {
	MONGO_URL = MONGO_LOCAL_URL;
}
mongoose.connect(MONGO_URL).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */         
    },
    err => {
         /** handle initial connection error */ 
         console.log('error connecting to Mongo: ')
         console.log(err);
         
        }
  );

module.exports = mongoose.connection