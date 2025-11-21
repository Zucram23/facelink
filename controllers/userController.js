const User = require('../models/user');
const Post = require('../models/post');


exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const newUser = new User({
            name,
            email,
            posts: []
        });

        await newUser.save();

        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            posts: newUser.posts
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("posts");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts");
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};