import app from './app';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.DB_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});