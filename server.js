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
        helpersPath: 'views/helpers',
        partialsPath: 'views/partials'
    });
    //AQUI VAN MIS RUTAS
    // Add the route
    server.route({
        method: 'POST',
        path: '/hello',
        handler: function(request, reply) {

            return reply('hello world');
        }
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {

            return reply('hello raíz');
        }
    });
    server.route({
        method: 'GET',
        path: '/prueba',
        handler: function(request, reply) {
            reply.file('index.html');
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