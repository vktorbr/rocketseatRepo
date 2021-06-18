const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

const data = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    noCache: true,
    autoescape: false
});

server.get("/", function(req, res){
    const about = {
        img_url: "https://yt3.ggpht.com/ytc/AAUvwniZFvNe5OEM2bTjcGRdH8fOW06pr9HYSJCwDPK_BA=s900-c-k-c0x00ffffff-no-rj",
        title: "Rocketseat",
        description: "Criamos um ambiente dedicado para que programadores e programadoras possam se conectar com as oportunidades, estudar e crescer na carreira através de uma jornada de aprendizado completa e contínua.",
        techs: ["JavaScript", "ReactJS", "React Native"]
    };

    return res.render("about", {about});
});

server.get("/posts", function(req, res){
    return res.render("posts", {cards: data});
})

server.get("/post/:id", function(req, res){
    const id = req.params.id;
    const post = data.find(function(post){

        let title = post.title.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "").replace("  ", " ").replace(/ /g, "-");
        
        if(title == id){
            return true;
        }
    })

    if(!post){
        return res.send("post not found!");
    }
    return res.render("post", {card: post, post_id: id});
})

server.use(function(req, res){
    res.status(404).render("not-found");
});

//inicializa o server
server.listen(5001, function(){
    console.log("server is running");
})