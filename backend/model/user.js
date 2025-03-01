const mongoose = require('mongoose');

const url = 'mongodb+srv://202203065:606lq2zRw4fX2rnI@cluster0.n48i7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: "https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?semt=ais_incoming",
        },
        fullName: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user",
        },
        salt: {
            type: String,
        },
        bio: {
            type: String,
            default: "",
            maxlength: 500,
        },
        dateOfBirth: {
            type: Date,
        },
    },
    { timestamps: true } 
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
