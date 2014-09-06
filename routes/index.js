var utils = require( '../utils' );
var mongoose = require( 'mongoose' );
var Todo = mongoose.model( 'Todo' );
exports.index = function ( req, res, next ){
    var time = req.cookies ?
        req.body.time : undefined;
    Todo.


        exec( function ( err, todos ){
            if( err ) return next( err );
            res.render( 'index', {
                title : 'Express Todo Example',
                todos : todos
            });
        });
};
exports.create = function ( req, res, next ){
    var time = req.cookies ?
        req.body.time : undefined;
    new Todo({
        user_id : req.cookies.user_id,
        lesson : req.body.lesson,
        time: req.body.time,
        trainer:req.body.trainer,
        price:req.body.price,
        updated_at : Date.now()
    }).aggregate({time:time}).save( function ( err, todo, count ){
            if( err ) return next( err );
            res.redirect( '/' );
        });
};
exports.destroy = function ( req, res, next ){
    Todo.findById( req.params.id, function ( err, todo ){
        var user_id = req.cookies ?
            req.cookies.user_id : undefined;
        if( todo.user_id !== req.cookies.user_id ){
            return utils.forbidden( res );
        }
        todo.remove( function ( err, todo ){
            if( err ) return next( err );
            res.redirect( '/' );
        });
    });
};
exports.edit = function( req, res, next ){
    var user_id = req.cookies ?
        req.cookies.user_id : undefined;
    Todo.
        find({ user_id : user_id }).
        sort( '-updated_at' ).
        exec( function ( err, todos ){
            if( err ) return next( err );
            res.render( 'edit', {
                title : 'Express Todo Example',
                todos : todos,
                current : req.params.id
            });
        });
};
exports.update = function( req, res, next ){
    Todo.findById( req.params.id, function ( err, todo ){
        var user_id = req.cookies ?
            req.cookies.user_id : undefined;
        if( todo.user_id !== user_id ){
            return utils.forbidden( res );
        }
        todo.lesson = req.body.lesson;
        todo.updated_at = Date.now();
        todo.save( function ( err, todo, count ){
            if( err ) return next( err );
            res.redirect( '/' );
        });
    });
};
// ** express turns the cookie key to lowercase **
exports.current_user = function ( req, res, next ){
    var user_id = req.cookies ?
        req.cookies.user_id : undefined;
    if( !user_id ){
        res.cookie( 'user_id', utils.uid( 32 ));
    }
    next();
};