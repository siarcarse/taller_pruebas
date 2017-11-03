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
                	for (var i = 0; i < users.length; i++) {
                		var usersObj = users[i];
                		var html = '';
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
            console.log('Fuera del ajax Abajo'); 
    });