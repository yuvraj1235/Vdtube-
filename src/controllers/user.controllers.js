import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";


import {uploadOnCloudinary} from "../utils/cloudinary.js"
const registerUser=asyncHandler(async(req,res)=>{
    const {fullname,email,username,password}=req.body
    if([fullname,email,username,password].some((fields)=>
        fields?.trim()==""        
    ))
    if(fullname?.trim()==""){
        throw new ApiError(400,"All fields are required");
        
    }
    const exisitedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(exisitedUser){
        throw new ApiError(409,"The user already exists")
    }
     const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
     if(!avatarLocalPath){
        throw new ApiError(400,"The avatar doesn't exists")
    }
    if(!coverImageLocalPath){
        throw new ApiError(400,"The cover doesn't exists")
    }
     const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(coverImageLocalPath){
        coverImage=await uploadOnCloudinary(coverImageLocalPath)
    }
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

export {registerUser}