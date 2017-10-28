module.exports = [{
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        return reply.view('app/index');
    }
}, {
    method: 'GET',
    path: '/login',
    handler: function(request, reply) {
        return reply.view('app/login');
    }
}, {
    method: 'GET',
    path: '/public/{path*}',
    handler: {
        directory: {
            path: './public',
            listing: false,
            index: false
        }
    }
}];