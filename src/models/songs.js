import mongoose from 'mongoose';

const songsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Song name is required'],
        maxlength: [20, 'Name must be at most 20 characters long'],
        trim: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: [true, 'Artist is required'],
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
    },
    audioUrl: {
        type: String,
        required: [true, 'Audio URL is required'],
    },
    coverImage: {
        type: String,
        default: 'https://media.istockphoto.com/id/179051838/photo/baby-seal-in-distress.jpg?s=1024x1024&w=is&k=20&c=_wqEA9hqegmpKNHtaelNl7uCRlvVISaCHjXqVn0kUvA='
    },
     releasedDate: {
        type: Date,
        default: Date.now
    },
    genre: {
        type: String,
        trim: true,
    },

    plays: {
        type: Number,
        default: 0
    },

    likes: {
        type: Number,
        default: 0
    },
    isExplicit: {
        type: Boolean,
        default: false
    },

    featuredArtist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',

        trim: true,
    }],
    

},
{
    timestamps: true
}
);

const Songs = mongoose.model('Songs', songsSchema);

export default Songs;

