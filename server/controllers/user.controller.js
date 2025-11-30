
import UserService from "../service/user.service.js";
import catchAsync from "../utils/catchAsync.js";
// Note: User, bcrypt, and jwt are removed as they are service-level concerns

const getAllUsers = catchAsync(async (req, res) => {
    // 1. Controller delegates to the Service
    const users = await UserService.getAll();
    
    // 2. Controller handles HTTP response
    res.status(200).json({ success: true, data: users });
});

const getUserById = catchAsync(async (req, res) => {
    // 1. Controller delegates: extracts id from req.params
    const user = await UserService.getById(req.params.id);
    
    // 2. Controller handles HTTP response
    res.status(200).json({ success: true, data: user });
});

const createUser = catchAsync(async (req, res) => {
    // 1. Controller delegates: passes req.body data
    const created = await UserService.create(req.body);

    // 2. Controller handles HTTP response
    res.status(201).send({ success: true, data: created });
});

const updateUserById = catchAsync(async (req, res) => {
    // 1. Controller delegates: passes id and body
    const updated = await UserService.update(req.params.id, req.body);

    // 2. Controller handles HTTP response
    res.status(200).json({ success: true, message: "User updated successfully", data: updated });
});

const deleteUserById = catchAsync(async (req, res) => {
    // 1. Controller delegates
    await UserService.remove(req.params.id);

    // 2. Controller handles HTTP response
    res.status(200).json({ success: true, message: "User deleted successfully" });
});

// Export the final controller object
const UserController = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createUser
}

export default UserController;