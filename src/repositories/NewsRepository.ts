import mongoose from '../database/Connection';
import News from '../models/News';

export default mongoose.model('News', News);
