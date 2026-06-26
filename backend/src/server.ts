import dotenv from 'dotenv';
// Load environment variables before importing other modules
dotenv.config();

import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error(`Unhandled Promise Rejection: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
