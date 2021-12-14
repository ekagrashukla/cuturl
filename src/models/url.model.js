const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortUrlSchema = new Schema({
    type: {
        type: Schema.Types.String,
        required: true
    },
    type_id: {
        type: Schema.Types.String
    },
    sub_type: {
        type: Schema.Types.String
    },
    sub_type_id: {
        type: Schema.Types.String
    },
    short_url: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        trim: true
    },
    share_for: {
        type: Schema.Types.String,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    shared_on: {
        type: Schema.Types.Date,
        trim: true
    },
    click_count: {
        type: Schema.Types.Number,
        default: 0
    },
    full_url: {
        type: Schema.Types.String,
        trim: true
    },
    public: {
        type: Schema.Types.Boolean,
        default: true
    }
}, { timestamps: true });

const ShortUrl = mongoose.model('shortUrl', shortUrlSchema)

module.exports = ShortUrl
