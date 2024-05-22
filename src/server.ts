import app from './app';
import { config } from 'dotenv';
config();

app.listen(process.env.APP_PORT || 3088, () => {
    console.log(`Server started on port ${process.env.APP_PORT || 3088}`);
});
