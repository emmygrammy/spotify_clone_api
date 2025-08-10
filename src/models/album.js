import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Album title is required'],
        maxlength: [20, 'Name must be at most 20 characters long'],
        trim: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Artist is required'],
        unique: [true, 'Artist already exists'],
        ref: 'Artist',

       

    },
    releasedDate: {
        type: Date,
        default: Date.now

    },
    coverImage: {
        type: String,
        default: 'https://pixabay.com/photos/person-human-child-girl-blond-822803/'
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
    }],
    genre: {
        type: String,
        trim: true
    },


    likes: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        trim: true
    },
    isExplicit: {
        type: Boolean,
        default: false
    },

},
{
    timestamps: true
}
);

const Album = mongoose.model('Album', albumSchema);

export default Album;

