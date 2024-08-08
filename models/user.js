const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{type: String,required:true},
    email:{type: String,required:true,unique:true,index:true},
    image:{type: String,default:'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705622400&semt=ais'},
    password:{type: String},
    isVerified:{type: Boolean,default:false},
    verifyOTP:{type: Number,default:0},
    verifyOTPExpiry:{type: Date,default:Date.now},
    forgotPasswordToken:{type: String},
    forgotPasswordTokenExpiry:{type: Date}
},{timestamps:true});

export default mongoose.models.User || mongoose.model("User",UserSchema);
// export default mongoose.model("user",UserSchema);
