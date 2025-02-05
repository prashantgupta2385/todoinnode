const  express=require("express");
const path=require("path")
const staticRouter=require("./routes/staticroute")
const userRouter=require("./routes/user");
const blogRouter=require("./routes/blogroute");
const commentRouter=require("./routes/commentroute");
const historyRouter=require("./routes/historyroute");
const {mongoose}=require("mongoose")
const cookieParser=require("cookie-parser");
require('dotenv').config();

const { checkForAuthenticationCookie } = require("./middleware/authentication");
const PORT=process.env.PORT;
const app=express()

mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("MongoDB sucessfully connected")})
 .catch((err)=>{console.log("this is the error",err)})
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))


app.use(express.static(path.resolve('./public')))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'))
app.use("/",staticRouter)
app.use('/user',userRouter)
app.use("/blog",blogRouter)
app.use("/blog/comment",commentRouter)
app.use("/user/history",historyRouter)


app.listen(PORT,()=>console.log(`server strted at port ${PORT}`))