import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

// Initialize Express app
const app = express();
const JWT_TOKEN = "SECRETTOKEN12345";

// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    hometown: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

// Home
app.get('/', (_req, res) => {});

// Authentication
app.post('/auth', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    let user = await User.findOne({
        email
    });

    if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).json({
                message: 'Invalid Password'
            });
        } else {
            const loginData = {
                email,
                signInTime: Date.now()
            };
            const token = jwt.sign(loginData, JWT_TOKEN);
            return res.status(200).json({
                message: 'success',
                token
            });
        }
    } else {
        const hash = await bcrypt.hash(password, 10);
        const userID = Date.now()
        user = new User({
            userID: userID,
            username: email,
            email: email,
            password: hash,
            firstName: "New",
            lastName: "User",
            hometown: "New Home",
            occupation: "New Job",
            major: "New Student"
        });
        await user.save();

        const loginData = {
            email,
            signInTime: Date.now()
        };
        const token = jwt.sign(loginData, JWT_TOKEN);
        return res.status(200).json({
            message: 'success',
            token
        });
    }
});

// Verification
app.post('/verify-token', (req, res) => {
    const tokenHeaderKey = 'jwt-token';
    const auth = req.headers[tokenHeaderKey];

    try {
        const verified = jwt.verify(auth, JWT_TOKEN);
        if (verified) {
            return res.status(200).json({
                status: 'success',
                message: 'success'
            });
        } else {
            return res.status(401).json({
                status: 'access denied',
                message: 'error'
            });
        }
    } catch (error) {
        return res.status(401).json({
            status: 'access denied',
            message: 'error'
        });
    }
});

// Account Exist
app.post('/account-exists', async (req, res) => {
    const {
        email
    } = req.body;
    const user = await User.findOne({
        email
    });

    res.status(200).json({
        status: user ? 'User exists' : 'User does not exist',
        userExists: !!user,
    });
});

// Update user profile
app.put('/update', async (req, res) => {

    const updateData = req.body;

    try {
        // Find the user by ID
        const user = await User.findOne({userID: updateData.userID});
        const users = await User.find({})
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        // Update fields only if they are provided in the request
        if (updateData.username) user.username = updateData.username;
        if (updateData.email) user.email = updateData.email;
        if (updateData.password) {
            const hashedPassword = await bcrypt.hash(updateData.password, 10);
            user.password = hashedPassword;
        }
        if (updateData.firstName) user.firstName = updateData.firstName;
        if (updateData.lastName) user.lastName = updateData.lastName;
        if (updateData.hometown) user.hometown = updateData.hometown;
        if (updateData.occupation) user.occupation = updateData.occupation;
        if (updateData.major) user.major = updateData.major;

        // Save the updated user data
        await user.save();

        return res.status(200).json({
            message: 'User profile updated successfully'
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({
            message: error
        });
    }
});

// Get user ID by email
app.post('/user-id', async (req, res) => {
    const {
        email
    } = req.body;

    try {
        const user = await User.findOne({
            email
        });

        if (user) {
            return res.status(200).json({
                userID: user.userID,
                firstName: user.firstName,
                lastName: user.lastName
            });
        } else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
});


// Server Listening on Port 3080
app.listen(3080, () => {
    console.log('Server running on port 3080');
});