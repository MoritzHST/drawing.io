const mdbc = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID

const url = 'mongodb://localhost:27017';
const dbName = 'drawing_io';


let MongoClient = (function(){
    class MongoClient {
        constructor() {
            this.connPromise = new Promise(async resolve => mdbc.connect(url, (err, client) => {
                console.log("Connected successfully to server");
                this.client = client
                this.db = client.db(dbName);
                this.createCollections(resolve);

            }));
        }

        createCollections(resolve) {
            this.db.createCollection("users", (err, res) => {
                if (err)
                    console.log("Collection users already exists!");
                else
                    console.log("Collection users created!");

                this.db.createCollection("lobbies", (err, res) => {
                    if (err)
                        console.log("Collection lobbies already exists!");
                    else
                        console.log("Collection lobbies created!");

                    resolve(true)
                });
            })

        }

        async insert(collection, query) {
            await this.connPromise
            this.connPromise = new Promise(async resolve => this.db.collection(collection).insertOne(query, {}, (err, res) =>{
                if (err)
                    console.log(err)
                resolve(res)
            }))

            return this.connPromise
        }

        async update(collection, query, data) {
            await this.connPromise
            this.connPromise = new Promise(async resolve => this.db.collection(collection).update(query, data, {}, (err, res) =>{
                if (err)
                    console.log(err)
                resolve(res)
            }))

            return this.connPromise
        }

        async findOne(collection, query) {
            await this.connPromise
            return new Promise(async resolve => this.db.collection(collection).findOne(query, {}, (err, res) => {
                if (err)
                    console.log(err)
                resolve(res)
            }))
        }


        close(){
            this.client.close()
        }

        convertToObjectId(id){
            return new ObjectID(id)
        }
    }
    let instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new MongoClient();
                // Hide the constructor so the returned object can't be new'd...
                instance.constructor = null;
            }
            return instance;
        }
    };
})();


module.exports = MongoClient
