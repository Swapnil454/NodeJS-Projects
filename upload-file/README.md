# Upload File (Node.js)

This project demonstrates how to upload files (such as images, documents, etc.) using Node.js and Express. It supports single and multiple file uploads, file validation, and secure storage.

## Features

- Upload single or multiple files
- File type and size validation
- Secure file storage in the `public/uploads` directory
- Error handling for invalid uploads
- RESTful API endpoints for file operations

## Technologies Used

- Node.js
- Express.js
- Multer (middleware for handling file uploads)

## Getting Started

1. Clone the repository:
	```powershell
	git clone <repo-url>
	cd upload-file
	```
2. Install dependencies:
	```powershell
	npm install
	```
3. Start the server:
	```powershell
	npm start
	```

## API Endpoints

- `POST /upload` - Upload a single file
- `POST /uploads` - Upload multiple files
- `GET /files` - List uploaded files
- `GET /files/:filename` - Download a specific file

## Usage

Use tools like Postman or a frontend form to send files to the API endpoints. Make sure to set the `enctype` to `multipart/form-data` in forms.

## Folder Structure

- `middlewares/` - Multer configuration and file validation
- `routes/` - Express route handlers for upload and file management
- `public/uploads/` - Directory where uploaded files are stored

## Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

## License

This project is licensed under the MIT License.
