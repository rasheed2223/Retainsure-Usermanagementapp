import sqlite3 from 'sqlite3';
import { promisify } from 'util';

class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(':memory:');
    this.init();
  }

  private async init() {
    const run = promisify(this.db.run.bind(this.db));
    
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await run('CREATE INDEX IF NOT EXISTS idx_users_name ON users(name)');
  }

  async run(sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }

  async get(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async all(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  close(): void {
    this.db.close();
  }
}

export const database = new Database();