module.exports = [{
    method: 'GET',
    path: '/users',
    handler: function(request, reply) {
        return reply.view('app/users');
    }
}]