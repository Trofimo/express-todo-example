var utils = require( '../utils' );
var mongoose = require( 'mongoose' );
var Todo = mongoose.model( 'Todo' );
exports.index = function ( req, res, next ){

    Todo.
        aggregate(
        [
            {
            $group : {
                _id : "$lesson",
                books: { $push: "$$ROOT" },
                count:{$sum:1}
            }

            }



        ]
        ,
        function(err, todos) {
            res.render('index', {

                todos: todos
            });

        }
);


};

exports.create = function ( req, res, next ){

    new Todo({

        lesson : req.body.lesson,
        time: req.body.time,
        trainer:req.body.trainer,
        price:req.body.price


    })

        .save( function ( err, todo, count ){
            if( err ) return next( err );
            res.redirect( '/' );

        });

};
exports.destroy = function ( req, res, next ){
    Todo.findById( req.params.id, function ( err, todo ){

        todo.remove( function ( err, todo ){
            if( err ) return next( err );
            res.redirect( '/' );
        });
    });
};
