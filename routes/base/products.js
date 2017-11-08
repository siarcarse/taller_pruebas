module.exports = [{
    method: 'GET',
    path: '/products',
    handler: function(request, reply) {
        return reply.view('app/products');
    }
}]