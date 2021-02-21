var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var interestSchema = new Schema({
    category_name: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    is_active: {
        type: Boolean,
        default:true
    }
});

var interest_exports = mongoose.model('category_details', interestSchema);

// var category = new interest_exports({
//     category_name: "Cricket",
//     tags: ["Bats", "Bolls", "Sports_Game"],
//     description:"Cricket is a Sport Game"
// });
// category.save();

module.exports = interest_exports;

