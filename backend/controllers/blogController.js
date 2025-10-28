import pool from '../config/db.js';

export const getAllPosts = async (req, res) => {
  try {
    const [posts] = await pool.execute('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const [posts] = await pool.execute('SELECT * FROM posts WHERE id = ?', [id]);
    if (posts.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(posts[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

export const createPost = async (req, res) => {
  const { title, content, author_id } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
      [title, content, author_id]
    );
    res.status(201).json({ message: 'Post created', postId: result.insertId });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};