const express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();

mongoose.connect('mongodb://localhost:27017/restful_blog_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
const Blog = mongoose.model("Blog", blogSchema);


// RESTFUL ROUTES

// INDEX ROUTE
app.get("/", (req, res) => res.redirect("/blogs"));
app.get("/blogs", (req, res) => {  
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log("Error!!!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
    
});

// NEW ROUTE
app.get("/blogs/new", (req, res) => res.render("new"));

//CREATE ROUTE  
app.post("/blogs", (req, res) => {
    //create blog
    Blog.create(req.body.blog)
        .then((newBlog) => res.redirect("/blogs"))
        .catch((error) => res.render("new"))
})

// SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id)
        .then(foundBlog => {
            res.render("show", {blog: foundBlog})
        })
        .catch((error) => res.redirect("/blogs"))
})

// Tell Express to listen for request (start server)
app.listen(8080, () => console.log("Server has started!"));

// title
// image 
// body 
// created