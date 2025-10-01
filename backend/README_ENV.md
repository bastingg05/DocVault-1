Environment variables for backend (.env)

Required
- MONGODB_URI=your-mongodb-connection-string
- JWT_SECRET=your-long-random-secret

Optional
- HOST=0.0.0.0
- PORT=5051                  # local only; Render sets PORT automatically
- ALLOW_ORIGINS=comma,separated,origins,without,spaces
  - Example:
    - ALLOW_ORIGINS=http://localhost:5173,https://yourapp.netlify.app,https://yourapp.vercel.app,https://docvault-1.onrender.com

Create a file named .env in the backend/ directory with these values. Restart the server after changes.


