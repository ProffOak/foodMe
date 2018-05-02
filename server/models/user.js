const mongoose = require('mongoose');

const Roles = mongoose.Schema({
    regular: Boolean,
    chef: Boolean,
    admin: Boolean
},{ _id : false });


const UserSchema = mongoose.Schema({
    uid: String,
    email: String,
    emailVerified: Boolean,
    createdAt: String,
    lastLoginAt: String,
    name: String,
    // An array with strings defining the role
    roles: {type:Roles, default: {regular:true}}
});

module.exports = mongoose.model('User', UserSchema);
