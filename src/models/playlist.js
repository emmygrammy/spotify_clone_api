import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
   name: {
        type: String,
        required: [true, 'Playlist name is required'],
        maxlength: [20, 'Name must be at most 20 characters long'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    coverImage: {
        type: String,
        default: 'https://media.istockphoto.com/id/179051838/photo/baby-seal-in-distress.jpg?s=1024x1024&w=is&k=20&c=_wqEA9hqegmpKNHtaelNl7uCRlvVISaCHjXqVn0kUvA='
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Creator is required'],
        ref: 'User',
    },

    isPublic: {
        type: Boolean,
        default: false
    },

    followers: {
        type: Number,
        default: 0,
    },

    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',

        trim: true,
    }],

    collaborators:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    
    

},
{
    timestamps: true
}
);

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist;

