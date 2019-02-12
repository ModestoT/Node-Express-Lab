const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

//this only runs if the url has /api/posts in it
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving the posts' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving the post' });
    }
});

module.exports = router;