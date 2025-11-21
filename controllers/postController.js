const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async (req, res) => {
    try {
        const { content, timestamp } = req.body;
        const userId = req.params.id || req.body.user_id;

        const user = await User.findById(userId);
        if (!user) {
        return res.status(400).json({ message: 'User not found' });
        }
        const newPost = new Post({
            content,
            user_id: userId,
            timestamp: timestamp || Date.now(),
            likes: 0
        });
        await newPost.save();

        user.posts.push(newPost._id);
        await user.save();

        res.status(200).json({
            id: newPost.id,
            user_id: newPost.user_id,
            content: newPost.content,
            timestamp: newPost.timestamp,
            likes: newPost.likes
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const postId = req.params.post_id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post ikke fundet' });
        }

        post.likes += 1;
        await post.save();

        res.status(200).json({
            id: post.id,
            user_id: post.user_id,
            content: post.content,
            timestamp: post.timestamp,
            likes: post.likes
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.post_id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post ikke fundet' });
        }

        // Fjern post reference fra brugerens posts array
        await User.findByIdAndUpdate(
            post.user_id,
            { $pull: { posts: postId } }
        );

        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user_id', 'name email');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMostLikedPosts = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            { $sort: { likes: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsersWithMostPosts = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $project: {
                    id: 1,
                    name: 1,
                    email: 1,
                    totalPosts: { $size: { $ifNull: ["$posts", []] } }
                }
            },
            { $sort: { totalPosts: -1 } }
        ]);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}