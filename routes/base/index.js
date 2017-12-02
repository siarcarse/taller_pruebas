module.exports = [{
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        return reply.view('app/index');
    }
}, {
    method: 'GET',
    path: '/login',
    config: { auth: false },
    handler: function(request, reply) {
        if (request.auth.isAuthenticated) {
            return reply.redirect('/');
        }
        return reply.view('app/login');
    }
}, {
    method: 'POST',
    path: '/login',
    config: { auth: false },
    handler: function(request, reply) {
        var password = request.payload.password;
        var uuid = 1;
        var username = request.payload.username;
        var sql = `SELECT * FROM users WHERE username = '${username}' AND 
                    password = '${password}' LIMIT 1`;
        request.pg.client.query(sql, function(err, result) {
            if (err) {
                return reply.redirect('/login');
            }
            var account = result.rows[0];
            if (!account || account.password !== password) {
                reply.view('app/login', { error: 'Usuario y contraseña no encontrados.' })
            } else {
                const sid = String(++uuid);
                request.server.app.cache.set(sid, { account: account }, 0, function(err) {
                    if (err) {
                        reply.view('app/login', { error: 'Error creando sesión' })
                    }
                    request.cookieAuth.set({ sid: sid });
                    return reply.redirect('/')
                })
            }
        });
    }
}, {
    method: 'GET',
    path: '/public/{path*}',
    config: { auth: false },
    handler: {
        directory: {
            path: './public',
            listing: false,
            index: false
        }
    }
}];