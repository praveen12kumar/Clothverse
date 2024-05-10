import mongoose,{Schema} from "mongoose";

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        public_id:{
            String,
            required:true,
        },
        url:{
            String,
            required:true,
        }
    },
    tags:{
        type:Array,
    },
    category:{
        type:Array,
        required:true,
    },
    numOfComments:{
        type:Number,
        default:0,
    },
    comments:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            comment:{
                type:String,
                required:[true, "Comment is required"],
                maxlength:[150, "Comment can not exceed 150 characters"]
            }
        }
    ],
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;