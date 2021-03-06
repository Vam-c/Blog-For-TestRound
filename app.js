require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://admin-vamsee:"+process.env.PASSWORD+"@cluster0-shard-00-00.upkqa.mongodb.net:27017,cluster0-shard-00-01.upkqa.mongodb.net:27017,cluster0-shard-00-02.upkqa.mongodb.net:27017/testblogDB?ssl=true&replicaSet=atlas-f7p89f-shard-0&authSource=admin&retryWrites=true&w=majority",{useNewUrlParser: true});

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

//API for fetching particular post
app.route("/:postName")
.get(function(req, res){
    Post.findOne({title: req.params.postName}, function(err, foundPost){
        if(err){
            res.send(err);
        } else if(foundPost) {
            res.send(foundPost);
        } else {
            res.send("Post does not exist");
        }
    });
})
.delete(function(req, res){
    Post.deleteOne({title: req.params.postName}, function(err){
        if(err){
            res.send(err);
        } else {
            res.send("Item successfully deleted");
        }
    });
})
.put(function(req, res){
    Post.findOneAndUpdate({title: req.params.postName},
        {$set: {title: req.body.title, content: req.body.content}},
        function(err){
            if(err){
                res.send(err);
            } else {
                res.send("Item successfully updated");
            }
        }
    );
});

app.listen(process.env.PORT, function() {
    console.log("Server started on port 3000");
});
