const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const blogPosts = [];

app.get('/', (req, res) => {
  res.render('index', { blogPosts });
});

app.get('/new-post', (req, res) => {
  res.render('new-post');
});

app.post('/create-post', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date(),
  };
  blogPosts.push(newPost);
  res.redirect('/');
});

app.get('/post/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find((p) => p.id === postId);
  res.render('post', { post });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
