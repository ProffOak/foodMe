const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    uid: String,
    email: String,
    emailVerified: Boolean,
    createdAt: String,
    lastLoginAt: String,
    name: String,
    // An array with strings defining the role
    roles: { type:[{type: String, enum: ['regular', 'chef', 'admin']}], default: ['regular']}
});

module.exports = mongoose.model('User', UserSchema);
