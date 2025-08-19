# UrlShortner

UrlShortner is a Node.js project that allows users to shorten long URLs, manage their links, and track usage statistics. The project includes user authentication and authorization, ensuring secure access to user-specific data and actions.

## Features

- **User Authentication & Authorization**: Secure signup, login, and protected routes using JWT or session-based authentication.
- **URL Shortening**: Convert long URLs into short, shareable links.
- **User Dashboard**: View and manage all your shortened URLs.
- **Statistics**: Track the number of clicks and usage analytics for each short URL.
- **RESTful API**: Endpoints for creating, retrieving, updating, and deleting URLs.
- **Error Handling**: Robust error responses for invalid URLs, unauthorized access, and more.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT or Passport.js for authentication
- EJS or React for views (if applicable)

## Getting Started

1. Clone the repository:
	```powershell
	git clone <repo-url>
	cd UrlShortner
	```
2. Install dependencies:
	```powershell
	npm install
	```
3. Set up environment variables in a `.env` file:
	```env
	MONGODB_URI=your_mongodb_connection_string
	JWT_SECRET=your_jwt_secret
	PORT=3000
	```
4. Start the server:
	```powershell
	npm start
	```

## API Endpoints

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and receive a token
- `POST /api/url` - Create a new short URL (requires authentication)
- `GET /api/url/:id` - Get details of a short URL
- `GET /api/url/user` - Get all URLs for the authenticated user
- `DELETE /api/url/:id` - Delete a short URL (requires authentication)

## Authorization

- Protected routes require a valid JWT token in the `Authorization` header.
- Only authenticated users can create, view, or delete their own URLs.

## Folder Structure

- `models/` - Mongoose models for User and URL
- `routes/` - Express route handlers for auth and URL operations
- `middlewares/` - Custom middleware for authentication and error handling
- `views/` - EJS templates (if using server-side rendering)
- `public/` - Static assets

## Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

## License

This project is licensed under the MIT License.
