const app=require('./src/app');
const PORT=process.env.PORT||3000;
const connectDB=require('./src/config/database');
dotenv=require('dotenv');
dotenv.config();

connectDB();



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});