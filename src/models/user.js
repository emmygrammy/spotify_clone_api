import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [20, 'Name must be at most 20 characters long'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
        lowercase: true,
        trim: true

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [20, 'Password must be at most 20 characters long'],
    },
    profilePicture: {
        type: String,
        default: 'https://pixabay.com/photos/portrait-man-basecamp-cap-dark-7676482/'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    likedSongs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Song',
    },
    likedAlbums: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Album',
    },
    followedArtists: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Artist',
    },

   followedPlaylists: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Playlist',
    },

},
{
    timestamps: true
});
//? compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//? Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;

