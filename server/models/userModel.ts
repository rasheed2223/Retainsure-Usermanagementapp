import { v4 as uuidv4 } from 'uuid';
import { database } from '../config/database.js';
import { User, CreateUserRequest, UpdateUserRequest } from '../types/user.js';

export class UserModel {
  static async create(userData: CreateUserRequest): Promise<User> {
    const id = uuidv4();
    const now = new Date().toISOString();
    
    await database.run(
      `INSERT INTO users (id, email, name, password, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, userData.email, userData.name, userData.password, now, now]
    );

    return this.findById(id) as Promise<User>;
  }

  static async findById(id: string): Promise<User | null> {
    const row = await database.get('SELECT * FROM users WHERE id = ?', [id]);
    return row ? this.mapRowToUser(row) : null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const row = await database.get('SELECT * FROM users WHERE email = ?', [email]);
    return row ? this.mapRowToUser(row) : null;
  }

  static async findAll(): Promise<User[]> {
    const rows = await database.all('SELECT * FROM users ORDER BY created_at DESC');
    return rows.map(this.mapRowToUser);
  }

  static async update(id: string, userData: UpdateUserRequest): Promise<User | null> {
    const updates: string[] = [];
    const values: any[] = [];

    if (userData.email) {
      updates.push('email = ?');
      values.push(userData.email);
    }
    if (userData.name) {
      updates.push('name = ?');
      values.push(userData.name);
    }
    if (userData.password) {
      updates.push('password = ?');
      values.push(userData.password);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    updates.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(id);

    await database.run(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const result = await database.run('DELETE FROM users WHERE id = ?', [id]);
    return result.changes! > 0;
  }

  static async searchByName(name: string): Promise<User[]> {
    const rows = await database.all(
      'SELECT * FROM users WHERE name LIKE ? ORDER BY name',
      [`%${name}%`]
    );
    return rows.map(this.mapRowToUser);
  }

  private static mapRowToUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      password: row.password,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
}