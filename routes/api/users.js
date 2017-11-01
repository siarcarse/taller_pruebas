module.exports = [{
    method: 'GET',
    path: '/api/users',
    handler: function(request, reply) {
        var sql = "SELECT * FROM users";
        request.pg.client.query(sql, function (err, result) {
        	if(err) {
        		console.log(err);
        		return reply([]);
        	}
        	return reply(result.rows);
        })
    }
}];