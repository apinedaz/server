import { Server, Socket } from "socket.io";

var mysql = require('mysql');

const io = new Server({ cors: { origin: "*" } });

var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "root",
        database: "socket"
    }
);

io.on("connection", (socket) =>
    {
        socket.on('prueba',()=>
            {
                console.log('mensaje recibido')
            }
        );

        socket.on('create',(data)=>
            {
                let sql = "INSERT INTO person (name,user,password,phone,email) VALUES('"+data.name+"','"+data.user+"','"+data.password+"','"+data.phone+"','"+data.email+"');";
                con.query(sql, function (err, result)
                    {
                        if(err) console.log(err);
                        console.log("Number of records inserted: " + result.affectedRows);
                    }
                );
            }
        );

        socket.on('consult',() =>
            {
                let sql = "SELECT * FROM person;";
                con.query(sql, function (err, result, fields) 
                    {
                        if(err) console.log(err);
                        socket.emit('response',result);
                    }
                );        
            }
        );
    }
);

io.listen(3000);