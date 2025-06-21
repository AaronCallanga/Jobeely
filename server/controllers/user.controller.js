import User from '../models/user.model.js';
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find().select("-password");

    return res.status(200).json({success: true, data: users});
})

const getUserById = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) throw new AppError(`User not found with the ID: ${req.params.id}`, 404);

    return res.status(200).json({success: true, data: user});
})

const createUser = catchAsync(async (req, res) => {
    const {email, password, isVerified} = req.body;

    const created = await User.create({email, password, isVerified});
    res.status(201).send({success: true, data: created});
})

const updateUserById = catchAsync(async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updated) throw new AppError(`User not found with the ID: ${req.params.id}`, 404);

    return res.status(200).json({success: true, message: "User updated succesfully", data: updated});
})

const deleteUserById = catchAsync(async (req, res) => {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) throw new AppError(`User not found with the ID: ${req.params.id}`, 404);

    return res.status(200).json({success: true, message: "User deleted successfully"});
})

const UserController = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createUser
}

export default UserController;
export {        // For Testing
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createUser
}