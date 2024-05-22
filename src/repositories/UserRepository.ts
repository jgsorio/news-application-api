import mongoose from '../database/Connection';
import userSchema from '../models/User';

export default mongoose.model('User', userSchema);
