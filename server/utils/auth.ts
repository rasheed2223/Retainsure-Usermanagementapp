import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../types/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const SALT_ROUNDS = 12;

export class AuthUtils {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name
    };

    return jwt.sign(payload, JWT_SECRET, { 
      expiresIn: '24h',
      issuer: 'user-management-api',
      audience: 'user-management-client'
    });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  static sanitizeUser(user: User): Omit<User, 'password'> {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}