import Blog from "../models/blog.models";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
import cloudinary from "cloudinary";


const createBlog = asyncHandler(async(req, res)=>{
    const {title, description, tags, category} = req.body;
    
    const blogLocalPath = req.file?.path;
    if(!blogLocalPath){
        throw new ApiError(400, "blog image is required");
    }

    const blogImage = await uploadOnCloudinary(blogLocalPath);
    if(!blogImage){
        throw new ApiError(400, "Image not uploaded")
    };

    const blog = await Blog.create({
        title, 
        description,
        tags,
        createdBy:req.user._id,
        category,
        image:{
            public_id:blogImage.public_id,
            url:blogImage.url,
        }
    });

    res.status(201).json(
        new ApiResponse(201, blog, "blog created successfully")
    )
});


const getAllBlogs = asyncHandler(async(req, res)=>{
    const {search, sort, category} = req.query;
    const page = Number(req.query.page) || 1;

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;
    const baseQuery = {}

    if(search){
        baseQuery.title = {
            $regex:search,
            $options:"i"
        }
    }
    if(category){
        baseQuery.category = category;
    }

    const blogs = await Blog.find(baseQuery).limit(limit).skip(skip)

    console.log(blogs);

    res.status(200).json(
        new ApiResponse(200, blogs, "All Blogs")
    )
})

const getSingleBlog = asyncHandler(async(req, res)=>{
    const blog = await Blog.findById(req.params.id).populate(["createdBy", "comments.user"]);
    if(!blog){
        return new ApiError(400, "Blog not found")
    };

    res.status(200).json(
        new ApiResponse(200, blog, "")
    )
});

const updateBlog = asyncHandler(async(req, res)=>{
    const {title, description, tags, category, image} = req.body;
    const newBlogData = {
        title,
        description,
        tags,
        category
    };

    const existingBlog = await Blog.findOne({_id:req.params.id, createdBy:req.user._id});

    if(!existingBlog){
        throw new ApiError(404, "Blog not found")
    };

    if(image !== undefined){
        const imageId = existingBlog.image.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const blogLocalPath = req.file?.path;
        if(!blogLocalPath){
        throw new ApiError(400, "blog image is required");
        }

        const blogImage = await uploadOnCloudinary(blogLocalPath);
        if(!blogImage){
            throw new ApiError(400, "Image not uploaded")
        };

        newBlogData.image = {
            public_id:blogImage.public_id.at,
            url: blogImage.url
        }
    }

    const blog = await Blog.findOneAndUpdate({_id:req.params.id, createdBy:req.user._id}, newBlogData, {new:true, runValidators:true});

    res.status(200).json(
        new ApiResponse(200, blog, "blog updated successfully")
    )
})


const deleteBlog = asyncHandler(async(req, res)=>{
    const blog = await Blog.findByIdAndDelete({_id:req.params.id, createdBy:req.user._id});

    if(blog == null){
        throw new ApiError(404, "Blog not found");
    };

    // delete cloudinary images
    const imageId = blog.image?.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    res.status(200).json(
        new ApiResponse(200, "", "Blog deleted successfully")
    )
});

const createBlogComment = asyncHandler(async(req, res)=>{
    const {comment} = req.body;
    const userComment = {
        user:req.user._id,
        name:req.user.name,
        comment
    };

    const blog = await Blog.findById(req.params.id);
    if(!blog){
        throw new ApiError(404, "Blog not found")
    };

    const commentCount = blog.numOfComments;
    blog.comments=blog.comments.filter((com)=>com.user.toString()!=req.user._id.toString());

    if(commentCount===blog.comments.length) blog.numOfComments=blog.numOfComments+1;

    blog.comments.push(userComment);
    await blog.save({ validateBeforeSave: true });

    res.status(200).json(
        new ApiResponse(200, blog, "comment added")
    )
});


const getBlogComments = asyncHandler(async(req, res)=>{
    let blog = await Blog.findById(req.params.id).populate("comments.user");

    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }
  
    res.status(200).json({
       success:true,
       comments: blog.comments,
       message:"All comments"
    });
});

const getBlogComment = asyncHandler(async(req,res,next)=>{
    const comments = await Blog.findOne({_id:req.params.id,comment:{$elemMatch:{user:req.user._id}}}).select(["comments"]);
    if(!comments){
        throw new ApiError(404, "Blog comment not found");
    }

    res.status(200).json({
        success:true,
        comment:comments.comments.filter(comment=>comment.user.toString()===req.user._id.toString())[0],
    })
})


export {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    createBlogComment,
    getBlogComments,
    getBlogComment,
    
}
