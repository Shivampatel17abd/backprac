
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.models.js'
import{uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const registerUser = asyncHandler(async (req,res)=>{
     // getUser details from frontend
     // validation
     //  check if user exists
     // check for images, check for avatar
     // upload them to cloudinary
     //create object
     // remove password and refresh token field from response
     // check user creation
     // return response
     
    const {username,email,fullName,password} = req.body;
    console.log(fullName,email,username,password);
    
     
    if([fullName,email,username,password].some((field)=>
      field?.trim() === ""
    )){
       throw new ApiError(400,"All field are required")
    }
    
   
   // const existedUser = await User.findOne({
   //    $or:[{ username } , { email }]
   //  })
   const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    console.log("clear");
    
     
   
    
   
    if(existedUser){
      throw new ApiError(409,"User with  username or email alrady exists")
    }

   const avatarLocalPath =  req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

   if(!avatar){
    throw new ApiError(409,"Avatar is required");
   }
   
   
   
   const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    password,
    email,
    username:username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   );
  
   if(!createdUser){
      throw new ApiError(500,"some thing went wrong while creating user")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
   )
    
})


export {
    registerUser
    
}