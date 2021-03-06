'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const handlebars = require('handlebars');
const hapiAuthCookie = require('hapi-auth-cookie');
const extend = require('handlebars-extend-block');
const dotenv = require('dotenv');

dotenv.load();
// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: 8000
});
server.register([
    { register:  Inert },
    { register: hapiAuthCookie },
    { register:  Vision },
    { register: require('hapi-postgres-connection') },
    {
        register: require('hapi-router'),
        options: {
            routes: 'routes/**/*.js'
        }
    }
], function(err) {
    if (err) {
        console.log("Failed to load module. ", err);
    }
    const cache = server.cache({ segment: 'session', expiresIn: 3 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', true, {
        password: 'iuyqweiuqyweiuqwkjhdgaskjhdgakshjdgajshdgajhsgdjhasgd',
        cookie: 'sid-aiep',
        redirectTo: '/login',
        isSecure: false,
        validateFunc: function(request, session, callback) {
            cache.get(session.sid, function(err, cached) {
                if (err) {
                    return callback(err, false);
                }
                if (!cached) {
                    return callback(null, false);
                }
                return callback(null, true, cached.account);
            })
        }
    })

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
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});