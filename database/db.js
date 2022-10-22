const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://taype:taype@certus.cqbczub.mongodb.net/?retryWrites=true&w=majority')

client.connect()
  .then(res => console.log('connection to database is succesful'))
  .catch(err => console.log('connection to database fail'))

module.exports = client;