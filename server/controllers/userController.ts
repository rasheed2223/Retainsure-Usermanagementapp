import { Request, Response } from 'express';
import { UserModel } from '../models/userModel.js';
import { AuthUtils } from '../utils/auth.js';
import { validateRequest, userValidation } from '../utils/validation.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { ApiResponse, CreateUserRequest, UpdateUserRequest, LoginRequest } from '../types/user.js';

export class UserController {
  static getAllUsers = asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const users = await UserModel.findAll();
    const sanitizedUsers = users.map(AuthUtils.sanitizeUser);

    res.status(200).json({
      success: true,
      data: sanitizedUsers,
      message: `Found ${sanitizedUsers.length} users`
    });
  });

  static getUserById = asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const { id } = req.params;

    if (!id) {
      throw new AppError('User ID is required', 400);
    }

    const user = await UserModel.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      data: AuthUtils.sanitizeUser(user)
    });
  });

  static createUser = asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const validatedData = validateRequest(userValidation.create, req.body) as CreateUserRequest;

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(validatedData.email);
    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    // Hash password before storing
    const hashedPassword = await AuthUtils.hashPassword(validatedData.password);
    const userData = { ...validatedData, password: hashedPassword };

    const user = await UserModel.create(userData);

    res.status(201).json({
      success: true,
      data: AuthUtils.sanitizeUser(user),
      message: 'User created successfully'
    });
  });

  static updateUser = asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const { id } = req.params;
    const validatedData = validateRequest(userValidation.update, req.body) as UpdateUserRequest;

    if (!id) {
      throw new AppError('User ID is required', 400);
    }

    // Check if user exists
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      throw new AppError('User not found', 404);
    }

    // Check if email is being updated and already exists
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const emailExists = await UserModel.findByEmail(validatedData.email);
      if (emailExists) {
        throw new AppError('Email already exists', 409);
      }
    }

    // Hash password if being updated
    if (validatedData.password) {
      validatedData.password = await AuthUtils.hashPassword(validatedData.password);
    }

    const updatedUser = await UserModel.update(id, validatedData);

    res.status(200).json({
      success: true,
      data: AuthUtils.sanitizeUser(updatedUser!),
      message: 'User updated successfully'
    });
  });

  static deleteUser = asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const { id } = req.params;

    if (!id) {
      throw new AppError('User ID is required', 400);
    }

    const deleted = await UserModel.delete(id);
    if (!deleted) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  });

  static searchUsers = asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const validatedData = validateRequest(userValidation.search, req.query);
    const { name } = validatedData;

    const users = await UserModel.searchByName(name);
    const sanitizedUsers = users.map(AuthUtils.sanitizeUser);

    res.status(200).json({
      success: true,
      data: sanitizedUsers,
      message: `Found ${sanitizedUsers.length} users matching "${name}"`
    });
  });

  static login = asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const validatedData = validateRequest(userValidation.login, req.body) as LoginRequest;
    const { email, password } = validatedData;

    // Find user by email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Verify password
    const isValidPassword = await AuthUtils.comparePassword(password, user.password!);
    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate token
    const token = AuthUtils.generateToken(user);

    res.status(200).json({
      success: true,
      data: {
        token,
        user: AuthUtils.sanitizeUser(user)
      },
      message: 'Login successful'
    });
  });
}