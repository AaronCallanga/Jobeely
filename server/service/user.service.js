import User from '../models/user.model.js';
import AppError from "../utils/AppError.js";

const getAll = async () => {
    // 1. Business Logic: Select fields, find all users
    return User.find().select("-password");
};

const getById = async (userId) => {
    const user = await User.findById(userId).select("-password");
    
    // 2. Business Logic: Check for existence and throw domain error
    if (!user) {
        throw new AppError(`User not found with the ID: ${userId}`, 404);
    }
    return user;
};

const create = async (userData) => {
    // 3. Business Logic: Create the user (Zod validation would go here)
    return User.create(userData);
};

const update = async (userId, updateData) => {
    // 4. Business Logic: Update the user with validation options
    const updated = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
    });

    if (!updated) {
        throw new AppError(`User not found with the ID: ${userId}`, 404);
    }
    return updated;
};

const remove = async (userId) => {
    // 5. Business Logic: Delete the user and check result
    const deleted = await User.findByIdAndDelete(userId);
    
    if (!deleted) {
        throw new AppError(`User not found with the ID: ${userId}`, 404);
    }
    // No data is returned upon successful deletion
};

// Export the object of functions
const UserService = {
    getAll,
    getById,
    create,
    update,
    remove, // Renamed from delete to avoid keyword issues
};

export default UserService;