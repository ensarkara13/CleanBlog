const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const ejs = require('ejs');

const {
  getAboutPage,
  getAddPostPage,
  getEditPage,
} = require('./controllers/pageController');
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('./controllers/postController');

const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db');

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

//Routes
app.get('/', getAllPosts);
app.get('/posts/:id', getPost);
app.post('/posts', createPost);
app.put('/posts/:id', updatePost);
app.delete('/posts/:id', deletePost);

app.get('/about', getAboutPage);
app.get('/add_post', getAddPostPage);
app.get('/posts/edit/:id', getEditPage);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is on port ${port}`);
});
