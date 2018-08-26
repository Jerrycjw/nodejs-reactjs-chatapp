import {MongoClient} from 'mongodb'

const URL = 'mongodb://heroku_z1k7wfk9:msjcpg3ju9asrisu76sv9sf2d3@ds133152.mlab.com:33152/heroku_z1k7wfk9';


export default class Database{

	connect(){


		return new Promise((resolve, reject) => {

			MongoClient.connect(URL, (err, db) => {
				
				return err ? reject(err) : resolve(db);

			});


		});



	}
}