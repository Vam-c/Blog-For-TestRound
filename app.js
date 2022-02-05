const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/testblogdb",{useNewUrlParser: true});

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = new mongoose.model("Post", postSchema);

app.get("/", function(req, res){
    Post.find({}, function(err, foundPosts){
        if(err){
            res.send(err);
        } else {
            res.send(foundPosts);
        }
    });

});

//API For creating posts (user sends title and content)
app.post("/create", function(req, res){
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    });
    newPost.save(function(err){
        if(err){
            res.send(err);
        } else {
            res.send("Post successfully saved");
        }
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
