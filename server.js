'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const handlebars = require('handlebars');
const extend = require('handlebars-extend-block');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: 8000
});
server.register([
    { register:  Inert },
    { register:  Vision }
], function(err) {
    if (err) {
        console.log("Failed to load module. ", err);
    }
    server.views({
        engines: {
            html: {
                module: extend(handlebars),
                isCached: false
            }
        },
        path: 'views',
        layoutPath: 'views/layout',
        layout: 'default',
        //helpersPath: 'views/helpers',
        partialsPath: 'views/partials'
    });
    //AQUI VAN MIS RUTAS
    // Add the route
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            return reply.view('app/index');
        }
    });
    server.route({
        method: 'GET',
        path: '/users',
        handler: function(request, reply) {
            return reply.view('app/users');
        }
    });
    server.route({
    method: 'GET',
    path: '/public/{path*}',
    handler: {
        directory: {
            path: './public',
            listing: false,
            index: false
        }
    }
});
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});