const pool = require('../config/database');

// Mock data for development
const mockPosts = [
    {
        id: 1,
        title: 'Welcome to Jazeera University ICT Girls Platform!',
        content: 'Hello everyone! This is our exclusive platform for female ICT students at Jazeera University. Let\'s build an amazing community together!',
        author_name: 'Admin User',
        author_student_id: 'ADMIN001',
        category_name: 'General Chat',
        category_color: '#6B7280',
        created_at: new Date().toISOString(),
        view_count: 15
    },
    {
        id: 2,
        title: 'Need help with Programming Fundamentals',
        content: 'I\'m having trouble understanding recursion in Java. Can anyone recommend good tutorials or study groups?',
        author_name: 'Sarah Ahmed',
        author_student_id: 'JU2024001',
        category_name: 'Courses Help',
        category_color: '#3B82F6',
        created_at: new Date().toISOString(),
        view_count: 8
    },
    {
        id: 3,
        title: 'Looking for team members for Hackathon',
        content: 'We need 2 more members for the upcoming university hackathon. Skills in React and Node.js preferred!',
        author_name: 'Fatima Mohammed',
        author_student_id: 'JU2024002',
        category_name: 'Project Teams',
        category_color: '#10B981',
        created_at: new Date().toISOString(),
        view_count: 12
    }
];

// Get all posts with categories
const getAllPosts = async (req, res) => {
    try {
        // Try to get real posts from database
        const [posts] = await pool.execute(`
            SELECT p.*, c.name as category_name, c.color as category_color, 
                   u.full_name as author_name, u.student_id as author_student_id
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN users u ON p.author_id = u.id
            ORDER BY p.created_at DESC
        `);

        // If we have real posts, use them. Otherwise use mock data.
        if (posts && posts.length > 0) {
            res.json(posts);
        } else {
            console.log('Using mock posts data');
            res.json(mockPosts);
        }
    } catch (error) {
        console.error('Get posts error, using mock data:', error.message);
        // If database fails, return mock data
        res.json(mockPosts);
    }
};

// Create new post
const createPost = async (req, res) => {
    try {
        const { title, content, category_id } = req.body;
        const author_id = req.user.id;

        if (!title || !content || !category_id) {
            return res.status(400).json({ error: 'Title, content, and category are required' });
        }

        const [result] = await pool.execute(
            'INSERT INTO posts (title, content, author_id, category_id) VALUES (?, ?, ?, ?)',
            [title, content, author_id, category_id]
        );

        // Get the created post with author info
        const [posts] = await pool.execute(`
            SELECT p.*, c.name as category_name, c.color as category_color, 
                   u.full_name as author_name, u.student_id as author_student_id
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN users u ON p.author_id = u.id
            WHERE p.id = ?
        `, [result.insertId]);

        res.status(201).json({
            message: 'Post created successfully',
            post: posts[0]
        });

    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

// Get posts by category
const getPostsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const [posts] = await pool.execute(`
            SELECT p.*, c.name as category_name, c.color as category_color, 
                   u.full_name as author_name, u.student_id as author_student_id
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN users u ON p.author_id = u.id
            WHERE p.category_id = ?
            ORDER BY p.created_at DESC
        `, [categoryId]);

        res.json(posts);
    } catch (error) {
        console.error('Get posts by category error:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

module.exports = { getAllPosts, createPost, getPostsByCategory };