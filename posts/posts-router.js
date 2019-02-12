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
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
});

router.post('/', async (req, res) => {

    if(!req.body.title || !req.body.contents ){
       res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        try {
            const post = await Posts.insert(req.body);
            const newPost = await Posts.findById(post.id);
            res.status(201).json(newPost);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        }
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postId = await Posts.remove(req.params.id);

        if(postId){
            res.status(200).json({ errorMessage: 'Post deleted' });
        } else {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The post could not be removed" });
    }
});

router.put('/:id', async (req, res) => {

    if(!req.body.title || !req.body.contents ){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        try {
            const updated = await Posts.update(req.params.id, req.body);
            if(updated) {
                const updatedPost = await Posts.findById(req.params.id);
                res.status(200).json(updatedPost);
            } else {
                res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error updating post' });
        }
    }
});

module.exports = router;