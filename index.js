const express = require("express");
const app = express();
const mongoose = require('mongoose');
const appointmentService = require('./services/AppointmentService');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/agendamento", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get("/", (req, res) => {
    res.send("Oi");
})

app.get("/cadastro", (req, res) => res.render("create"))

app.post('/create', async (req, res) => {
    const status = await appointmentService.Create(
        req.body.name,
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
    );

    if(status){
        res.redirect("/");
    }else{
        res.json({ err: "Ocorreu uma falha" }).status(500);
    }
});

app.listen(8888, () => {
    console.log("Server is running");
});