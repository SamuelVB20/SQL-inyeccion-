const express = require('express');
const mysql = require('mysql2');
const app = express();

const port =1234;

app.use(express.json());

const db = mysql.createConnection({
    host: 'mysql-3515a0a4-ericksom107-08e1.k.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_m0DlcipDO1_TlCuAjDX',
    database: 'seguridad_sql',
    port: 23492
});

app.get('/login-seguro', (req, res) => {
    const { usuario, password } = req.query;
    
const query =`SELECT* FROM usuarios
            WHERE usuario= ?
            AND password= ?
`;


db.query(query,[usuario, password] ,(err, results) => {
        if (err) res.json ({ err: err});

        if (results.length > 0) {
            res.json({ message: "Usuario autenticado(vuelnerable a SQL Injection)" });
        } else { 
            res.json({ message: "Credenciales inválidas" });    
        }
    });
          
});

app.listen(3000,() =>{
    console.log('Server running on port 3000');
})