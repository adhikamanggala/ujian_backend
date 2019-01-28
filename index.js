const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var port = 2019;
var app = express({ defaultErrorHandler: false });
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('public'))

const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'gala',
    password: '@adhikagala29',
    database: 'moviebertasbih',
    port: 3306
})

app.get('/', (req, res) => {
    res.send('<h1>Selamat datang di API buat latian</h1>')
})

app.get('/movies', (req, res) => {
    var sql = 'SELECT * FROM movies;';
    conn.query(sql, (err, result) => {
        console.log(result)
        res.send(result)

    })
})
//untuk get data dari tabel movies

app.get('/categories', (req, res) => {
    var sql = 'SELECT * FROM categories;';
    conn.query(sql, (err, result) => {
        console.log(result)
        res.send(result)

    })
})
//untuk get dari tabel categories

app.get('/movcat', (req, res) => {
    var sql = `SELECT
                mov.nama AS nama_movie, 
                cat.nama AS nama_category 
                FROM movcat mc 
                JOIN movies mov ON mc.idmovie = mov.id 
                JOIN categories cat ON mc.idcategory = cat.id`;
    conn.query(sql, (err, result) => {
        console.log(result)
        res.send(result)

    })
})
//untuk get dari tabel movcat

app.post('/addmovies', (req, res) => {
    var sql = 'INSERT INTO movies SET ?';
    var data = req.body;
    conn.query(sql, data, (err, results) => {
        res.send(results);
    });
});
//untuk menambah list di tabel movies

app.post('/addcategories', (req, res) => {
    var sql = 'INSERT INTO categories SET ?';
    var data = req.body;
    conn.query(sql, data, (err, results) => {
        res.send(results);
    });
});
//untuk menambah list di tabel categories

app.post('/addmovcat', (req, res) => {
    var sql = 'INSERT INTO movcat SET ?';
    var data = req.body;
    conn.query(sql, data, (err, results) => {
        res.send(results);
    });
});
//untuk menambah list di tabel movie-category


app.post('/editmovies/:id', (req, res) => {
    var sql = `UPDATE movies SET ? WHERE id= ${req.params.id}`
    var updatedMovies = req.body
    conn.query(sql, updatedMovies, (err, result) => {
        res.send(result);
    })
})
//untuk edit list tabel movies

app.post('/editcategories/:id', (req, res) => {
    var sql = `UPDATE categories SET ? WHERE id= ${req.params.id}`
    var updatedCategories = req.body
    conn.query(sql, updatedCategories, (err, result) => {
        res.send(result);
    })
})
//untuk edit list tabel categories


app.post('/deletemovies/:id', (req, res) => {
    var sql = `DELETE FROM movies WHERE id= ${req.params.id}`
    conn.query(sql, (err, result) => {
        res.send(result);
    })
})
//untuk delete list di tabel movies

app.post('/deletecategories/:id', (req, res) => {
    var sql = `DELETE FROM categories WHERE id= ${req.params.id}`
    conn.query(sql, (err, result) => {
        res.send(result);
    })
})
//untuk delete list di tabel categories

app.post('/deletemovcat/:id', (req, res) => {
    var sql = `DELETE FROM movcat WHERE id= ${req.params.id}`
    conn.query(sql, (err, result) => {
        res.send(result);
    })
})
//untuk delete list di tabel movcat

app.listen(port, () => console.log('API aktif di port ' + port))