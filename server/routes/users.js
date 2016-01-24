/**
 * Created by samanthamusselman on 1/23/16.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/address_and_orders_weekend_assignment';



module.exports = router;