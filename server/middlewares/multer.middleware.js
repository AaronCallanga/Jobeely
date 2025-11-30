import multer from "multer";
import path from "path";

// Configure Disk Storage
const storage = multer.diskStorage({
    // Defines the destination directory for saving uploaded files.
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/");  // Path where uploaded files will be permanently stored
    },
    // Defines a unique filename to prevent conflicts.
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Create the Multer instance middleware with the storage configuration 
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB file size limit
    },
    fileFilter: (req, file, cb) => {
        // Optional: Implement a file filter to allow only specific file types (e.g., images)
        const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
        // Test both mime type and extension name agains filetypes, returns boolean
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        // If both the MIME type and file extension are valid, accept the file
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("File upload only supports the following filetypes: " + filetypes), false);
    }
});

export default upload;