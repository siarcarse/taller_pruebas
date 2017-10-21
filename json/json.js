var users = [{
        "username": "scarcamo",
        "role": 1,
        "rolename": "Junior",
        "permission": [
            1, 2, 3, 4, 5, 6, 7, 8, 9
        ],
        "active": true
    },
    {
        "username": "jperez",
        "role": 1,
        "rolename": "Administrador",
        "permission": [
            1, 2, 3, 4, 5, 6, 7, 8, 9
        ],
        "active": true
    }
];
for (var i = 0; i < users.length; i++) {
	console.log("ITERACION " + i);
	console.log(users[i].username);
}

