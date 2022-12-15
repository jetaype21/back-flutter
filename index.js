'use strict'
// REQUIRES
var mongoose = require('mongoose');

//LLAMANDO APP 
const app = require('./app');

// SERVIDOR
var port = process.env.PORT || 7000

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://taype:taype@certus.cqbczub.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true
}).then(
    (res) => {console.log('connect to dabate is succesful')
    app.listen(port, () => {
      console.log('El sevidor en pierto uu');
    })
  }
  ).catch(
    error => console.log(error)
  )
