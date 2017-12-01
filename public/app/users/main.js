$(document).ready(function() {
    refreshTable();
    $('#saveButton').click(function(event) {
        var isUpdate = $(this).attr('data-update');
        if (isUpdate === 'true') {

        } else {
            var username = $('#username').val();
            var password = $('#password').val();
            $.post('/api/users', { username: username, password: password }, function(data, textStatus, xhr) {
                refreshTable();
                $('#modal-id').modal('hide');
            });
            $('#borrar').click(function(event) {
                console.log('me hicieron click');
            });
        }
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
                    html += '<td><i style="color: #606BFF; cursor: pointer;" class="fa fa-pencil-square-o fa-2x" aria-hidden="true" onclick="getDataRow(this)"></i></td>';
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
    if (confirm('Seguro que desea borrar?')) {
        $.ajax({
                url: '/api/users',
                type: 'DELETE',
                dataType: 'json',
                data: { id: id },
            })
            .done(function() {
                refreshTable();
            });
    }
}

function getDataRow(icono) {
    var id = $(icono).parent().siblings().first().text();
    var username = $(icono).parent().siblings().first().next().text();
    var password = $(icono).parent().siblings().first().next().next().text();
    $('#saveButton').attr('data-update', true);
    $('#username').val(username);
    $('#password').val(password);
    $('#modal-id').modal('show');
    console.log(id, username, password);
}