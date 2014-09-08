
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Todo = new Schema({

    lesson : String,
    time:Date,
    trainer:String,
    price:Number


});

mongoose.model( 'Todo', Todo);

mongoose.connect( 'mongodb://localhost/express-todo' );
