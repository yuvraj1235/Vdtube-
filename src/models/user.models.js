import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
const user_schema=new Schema({
     username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }


)
user_schema.pre("save",async function(next) {
        if(!this.isModified("password"))return next();
        this.password=await bcrypt.hash(this.password,10)
    next()    
})
user_schema.methods.isPasswordCorrect=async function(password) {
        return await bcrypt.compare(password,this.password)    
}
user_schema.methods.generateUserToken=async function(params) {
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName,
    }),'shhhhh',{expiresIn:'1h'}    
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },'shhhh',
        {
            expiresIn: '10d'
        }
    )
}

export const User =mongoose.model("User",user_schema)