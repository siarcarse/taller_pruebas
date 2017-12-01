$(document).ready(function() {
    refreshTable();
    $('#saveButton').click(function(event) {
        var username = $('#username').val();
        var password = $('#password').val();
        $.post('/api/users', { username: username, password: password }, function(data, textStatus, xhr) {
            refreshTable();
            $('#modal-id').modal('hide');
        });
        $('#borrar').click(function(event) {
            console.log('me hicieron click'); 
        });
    });
});

function refreshTable() {
    $.ajax({
            url: '/api/users',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(users) {
            if (users) {
                var html = '';
                for (var i = 0; i < users.length; i++) {
                    var usersObj = users[i];
                    html += '<tr>';
                    html += '<td>' + usersObj.id + '</td>';
                    html += '<td>' + usersObj.username + '</td>';
                    html += '<td>' + usersObj.password + '</td>';
                    html += '<td><i style="color: #FC57FB; cursor: pointer;" class="fa fa-ban fa-2x" aria-hidden="true" onclick="deleteRow(this)"></i></td>';
                    html += '</tr>';
                }
                $('#body-table').html(html);
            }
        })
        .fail(function(err) {
            console.log(err);
        });
}
function deleteRow(icono) {
    var id = $(icono).parent().siblings().first().text();
}