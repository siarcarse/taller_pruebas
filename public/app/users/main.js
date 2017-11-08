$(document).ready(function() {
    	console.log('Fuera del ajax arriba'); 
        $.ajax({
                url: '/api/users',
                type: 'GET',
                dataType: 'json'
            })
            .done(function(users) {
            	console.log('Dentro del ajax');
                if(users) {
                    var html = '';
                	for (var i = 0; i < users.length; i++) {
                		var usersObj = users[i];
                		html += '<tr>';
                		html += '<td>' + usersObj.id + '</td>';
                		html += '<td>' + usersObj.username + '</td>';
                		html += '<td>' + usersObj.password + '</td>';
                		html += '</tr>';
                	}
                	$('#body-table').html(html);
                }
            })
            .fail(function(err) {
                console.log(err);
            });
            $('#saveButton').click(function(event) {
                var username = $('#username').val();
                var password = $('#password').val();
                $.post('/api/users', {username: username, password: password}, function(data, textStatus, xhr) {
                    window.location.reload(true);
                });
            });
    });