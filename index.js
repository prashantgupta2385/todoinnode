const  express=require("express");
const path=require("path")
const staticRouter=require("./routes/staticroute")
const userRouter=require("./routes/user");
const {mongoose}=require("mongoose")
const PORT=8000;
const app=express()

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(()=>{console.log("MongoDB sucessfully connected")})
 .catch((err)=>{console.log("this is the error",err)})
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({extended:false}))
app.use("/",staticRouter)
app.use('/user',userRouter)


app.listen(PORT,()=>console.log(`server strted at port ${PORT}`))