import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    hat: {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    author: {
        type: String,
    },
    image: {
        type: String,
    },
    published: {
        type: Date,
    },
    link: {
        type: String,
    },
    active: {
        type: Boolean,
    }
});

export default newsSchema;
