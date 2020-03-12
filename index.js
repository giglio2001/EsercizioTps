const express=require ("express");
const app=express ();
const path=require ("path");
const sqlite3=require ("sqlite3");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set ("views",path.join(__dirname,"views"))
app.set ("view engine", "ejs");

const db=new sqlite3.Database("libri.db" , function(){
    app.listen(3000);  
}) ;

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname,"public", "index.html"));
});

app.get ("/autori", function(req,res){
    const sql="select * from autori;"
    db.all(sql,function(err,rows) {
        res.render("autori", {autori:rows});
    });
});

app.get ("/libri", function(req,res){
    const sql="select * from libri;"
    db.all(sql,function(err,rows) {
        res.render("libri", {libri:rows});
    });
});

app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname,"public", "admin.html"));
});

app.get ("/admin/autori", function(req,res){
    const sql="select * from autori;"
    db.all(sql,function(err,rows) {
        res.render("admin_autori", {autori:rows});
    });
});

app.get ("/admin/libri", function(req,res){
    const sql="select * from libri;"
    db.all(sql,function(err,rows) {
        res.render("admin_libri", {libri:rows});
    });
});

app.post("/modificautori", function(req, res) {
    const id = parseInt(req.body.id);
    sql="UPDATE Autori SET nome='"+req.body.nome+"',cognome='"+req.body.cognome+"' WHERE Autori.id ="+id;
    db.run(sql);
    res.redirect('/admin/autori');
});

app.post("/addautore", function(req, res) {
    const id = parseInt(req.body.id);
    sql="INSERT INTO Autori(id,nome,cognome) VALUES("+id+",'"+ req.body.nome +"','"+req.body.cognome+"')";
    db.run(sql);
    res.redirect('/admin/autori');
});

app.post("/delautore", function(req, res) {
    const id = parseInt(req.body.id);
    sql="DELETE FROM Autori WHERE Autori.id="+id;
    db.run(sql);
    res.redirect('/admin/autori');
});

app.post("/modificalibri", function(req, res) {
    const id = parseInt(req.body.id);
    sql="UPDATE Libri SET titolo='"+req.body.titolo+"',fk_autore="+req.body.fk_autore+" WHERE Libri.id ="+id;
    db.run(sql);
    res.redirect('/admin/libri');
});

app.post("/addlibro", function(req, res) {
    const id = parseInt(req.body.id);
    sql="INSERT INTO Libri(id,titolo, fk_autore) VALUES("+id+",'"+ req.body.titolo +"',"+req.body.fk_autore+")";
    db.run(sql);
    res.redirect('/admin/libri');
});

app.post("/dellibro", function(req, res) {
    const id = parseInt(req.body.id);
    sql="DELETE FROM Libri WHERE Libri.id="+id;
    db.run(sql);
    res.redirect('/admin/libri');
});

app.use( function(req, res){
    res.status(404);
    res.sendFile(path.join (__dirname,"public","errore.html"));
})