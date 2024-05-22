import app from './app';
import { config } from 'dotenv';
config();

app.listen(process.env.PORT || 3088, () => {
    console.log(`Server started on port ${process.env.PORT || 3088}`);
});
