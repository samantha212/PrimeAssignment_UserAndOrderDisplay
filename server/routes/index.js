/**
 * Created by samanthamusselman on 1/22/16.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/address_and_orders_weekend_assignment';

router.get('/', function(request, response){
    var joinedPath = path.join(__dirname, '../public/views/index.html');
    console.log('Joined path', joinedPath);

    response.sendFile(joinedPath);
});


router.get('/users', function(request, response){
    //console.log('This is working!');
    var results = [];
    pg.connect(connectionString, function(err, client, done){

        if(err) {
            console.log(err);
        }

        var query = client.query('SELECT * FROM users');

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            client.end();
            return response.json(results);
        });
    });
});


router.get('/getuseraddresses', function(request, response){
    console.log('This is working!');

    //response.send("Hello from the server.");
    var results = [];

    pg.connect(connectionString, function(err, client, done){

        if(err) {
            console.log(err);
        }

        var query = client.query('SELECT * FROM users LEFT OUTER JOIN addresses ON users.id = addresses.user_id');

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            client.end();
            return response.json(results);
        });
    });
});

module.exports = router;