
//Def. de variables
const express = require("express");
const PORT = process.env.PORT || 3000;

const mysql = require('mysql');

const bp = require('body-parser');

const app = express();

//Bodyparser/Middlewares
app.use(bp.urlencoded({ extended: false}));
app.use(bp.json());

//EJS
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/views'));

//MySql/Xampp
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'jeremias',
    password: 'jeremias12',
    database: 'preguntados'
})

//Crud
    //Get all
app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err 
        console.log(`conectado en ${connection.threadId}`);

        connection.query('SELECT * from preguntas'), (err, rows) => {
            connection.release(); //Retorna la conexion

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        }
    })
})
    //Get
    app.get('/:id', (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err 
            console.log(`conectado en ${connection.threadId}`);

            connection.query('SELECT * from preguntas WHERE id = ?'), [req.params.id], (err, rows) => {
                connection.release(); //Retorna la conexion
    
                if(!err) {
                    res.send(rows)
                } else {
                    console.log(err)
                }
            }
        })
    })
    //Delete By ID
    app.get('/:id', (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err 
            console.log(`conectado en ${connection.threadId}`);
            
            connection.query('DELETE from preguntas WHERE id = ?'), [req.params.id], (err, rows) => {
                connection.release(); //Retorna la conexion
    
                if(!err) {
                    res.send(rows)
                } else {
                    console.log(err)
                }
            }
        })
    })

    //POST 

    app.post('/:id', (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err 
            console.log(`conectado en ${connection.threadId}`);

            const params = req.body
            
            connection.query('INSERT INTO preguntas SET ?'), params, (err, rows) => {
                connection.release(); //Retorna la conexion
    
                if(!err) {
                    res.send(`Pregunta con la ID: ${params.id} ha sido a;adida`)
                } else {
                    console.log(err)
                }
            }
        })
    })
//Router
app.get('/', require('./router/index.js'));
app.get('/salud', require('./router/salud.js'));
/*app.get('/informatica', require('./router/informatica.js'));*/

//Listener
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});