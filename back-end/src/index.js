require('dotenv').config();


/* database setup and connection */
const mongoose= require('mongoose');
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set( 'useUnifiedTopology', true );

    mongoose.connect(`${process.env.SERVER}/${process.env.DATABASE}`,{useNewUrlParser:true})
    .then(function onconnected() {
        console.log("Connected to MongoDB");
    },function onrejected() {
        console.log("Unable to connect to MongoDB");
    }); 


/* express app setup*/
const express= require('express');
const app= express();
const server = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');

/* routes */
const usersRoute = require('./routes/users.route');
const menuRoute = require('./routes/menu.route');
const tablesRoute = require('./routes/tables.route');
const barRoute= require('./routes/bar.route');
const kitchenRoute = require('./routes/kitchen.route')
const reciptsRoute = require('./routes/recipts.route');

require('./helpers/passport.helper');

    server.listen(process.env.PORT,()=>console.log(`lisening on port ${process.env.PORT}`))

    app.use(morgan('tiny'));
    app.use(cors({
        origin: function(origin, callback){
        return callback(null, true);
        },
        optionsSuccessStatus: 200,
        credentials: true
    }));

    app.use(passport.initialize());
    app.use(bodyParser.json());
    app.use(usersRoute);
    app.use(menuRoute);
    app.use(tablesRoute);
    app.use(barRoute);
    app.use(kitchenRoute);
    app.use(reciptsRoute);



    /*error handling */
    app.use((req,res,next)=>{
        res.sendStatus(404);
    });

    app.use((err,req,res,next)=>{
        console.error(err.stack);
        res.sendStatus(500);
    });


/* socket io */

const io = require('socket.io')(server);
const socketioJwt=require('socketio-jwt');

    io.on('connection', socketioJwt.authorize({
        secret: process.env.PUBLIC_KEY,
        timeout: 0 // 15 seconds to send the authentication message
    })).on('authenticated', function(socket) {
        //this socket is authenticated, we are good to handle more events from it.
        console.log('hello! ' + socket.decoded_token.username);

        socket.on('booked_table',function(){
        console.log("table booked"); 
        socket.broadcast.emit('update_tables');
        });

            socket.on('kitchenOrder',function(){
            console.log('kitchen order message');
            socket.broadcast.emit('update_kitchenOrders');
            });

            socket.on('barOrder',function(){
            console.log('bar order message');
            socket.broadcast.emit('update_barOrders');
            });

            socket.on('kitchenOrderReady',function(){
            console.log("kitcehn order ready");
            socket.broadcast.emit('update_kitchenMessages');
            });

            socket.on('barOrderReady',function(){
            console.log("bar order ready");
            socket.broadcast.emit('update_barMessages');
            })

            socket.on('deleted_user',function(){
            console.log("deleted user");
            socket.broadcast.emit('update_users');
            })

            socket.on('updated_user',function(){
            socket.broadcast.emit('update_users');
            })
        
            socket.on('disconnect', function() {
            console.log("Bye bye " + socket.decoded_token.username)
            //delete global.userSocket[user];
            });

        });





























