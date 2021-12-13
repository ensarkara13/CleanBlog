const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const Post = require('./models/Post');

const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db');

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', async (req, res) => {
  // const blog = { id: 1, title: 'Blog title', description: 'Blog description' };
  // res.send(blog);
  const posts = await Post.find();
  res.render('index', { posts });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { post });
});

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda aktif!!!`);
});
