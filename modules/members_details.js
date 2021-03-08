var mongoose = require('mongoose');
const { ObjectID, ObjectId } = require('bson');
var Schema = require('mongoose').Schema;

var memberSchema = new Schema({
    club_id:{
        type: ObjectId,
        required:true
    },
    member_list: {
        type: Array,
        required:false
    },
    is_active: {
        type: Boolean,
        default:true
    }
});

var member_exports = mongoose.model('member_details', memberSchema);
// var member = new member_exports({
//     club_id: ObjectId('5ff41a96a04b22d9c9ff9ecc'),
//     member_list: [
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fc8afd3f90e0f10f05a29bc'),
//             level:"Admin"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5fd5ad0a3438823d4c2602c8'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5ff2f049e08aee26107d2d2a'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5ff2f049e08aee26107d2d2a'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5ff2f049e08aee26107d2d2a'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5ff2f049e08aee26107d2d2a'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5ff2f049e08aee26107d2d2a'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5ff2f049e08aee26107d2d2a'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5ff2f049e08aee26107d2d2a'),
//             level:"Member"
//         },
//         {
//             user_id: ObjectId('5ff2f049e08aee26107d2d2a'),
//             level:"Admin"
//         },
//         {
//             user_id: ObjectId('5fd5acbe3438823d4c2602c6'),
//             level:"Admin"
//         }
//     ]
// });
//member.save();
//module.exports = member_exports;

