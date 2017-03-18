var mongoose = require('mongoose');

/**
 * Application schema
 */
var applicationSchema = new mongoose.Schema({
    UTORid: {
        type: String,
        required: true,
        unique: true
    },
    session: String,  //E.g Fall 2017/ Winter 2017/ Summer 2017
    coursePref: [{
        courseCode: String,
        rank: Number
    }],
    status: boolean         //True: Submitted, False: Not Submitted
});
/*
* Makes sure the UTORid, session combination is unique.
* This also allows old applications to be stored.
*/
applicationSchema.index({ UTORid: 1, session: 1 }, {unique: true});

module.exports = mongoose.model('Courses', coursesSchema);
