import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected!');
    })
    .catch((error) => {
        console.log(error);
    });

export default mongoose;
