import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Artist name is required'],
        maxlength: [20, 'Name must be at most 20 characters long'],
        trim: true
    },
    bio: {
        type: String,
        required: [true, 'Artist bio is required'],
        maxlength: [200, 'Bio must be at most 200 characters long'],
        trim: true
    },
    releasedDate: {
        type: Date,
        default: Date.now

    },
    image: {
        type: String,
        default: 'https://media.istockphoto.com/id/179051838/photo/baby-seal-in-distress.jpg?s=1024x1024&w=is&k=20&c=_wqEA9hqegmpKNHtaelNl7uCRlvVISaCHjXqVn0kUvA='
    },
    genres: [{
        type: String,
        ref: 'songs',
    }],
    followers: {
        type: Number,
        default: 0
    },


    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
    }],
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
    }],
    isVerified: {
        type: Boolean,
        default: false
    },

},
{
    timestamps: true
}
);

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;

