import {MongoClient} from 'mongodb'

const URL = 'mongodb://localhost/chatapp';


export default class Database{

	connect(){


		return new Promise((resolve, reject) => {

			MongoClient.connect(URL, (err, db) => {
				
				return err ? reject(err) : resolve(db);

			});


		});



	}
}