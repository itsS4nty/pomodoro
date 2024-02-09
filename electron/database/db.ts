import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./mydb.sqlite', err => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

export const initializeDatabase = () => {
    db.run(
        `CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`,
        err => {
            if (err) {
                // Handle table creation error
                console.error(err.message);
            } else {
                // Table created or already exists
                console.log('Table created or already exists.');
            }
        },
    );
};

// Don't forget to close the database connection when your app quits
export const closeDb = () => db.close();

export class Database {
    private constructor(private readonly db: sqlite3.Database) {}

    private init() {
        this.db.run(
            `CREATE TABLE IF NOT EXISTS Config (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                work_phase_seconds NUMBER NOT NULL,
                break_phase_seconds NUMBER NOT NULL,
                long_break_phase_seconds NUMBER NOT NULL,
                counter_to_long_phase NUMBER NOT NULL,
                target_per_day NUMBER NOT NULL,
                premium BOOLEAN NOT NULL
            )`,
            err => {
                if(err)
                    throw err;
                console.log('Table created');
            }
        );
    }

    close() {
        this.db.close();
    }

    static connect(): Promise<Database> {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./database.sqlite', err => {
                if (err) {
                    console.error('Connection failed:', err);
                    reject(err); // Connection failed, reject the promise.
                } else {
                    console.log('Connected!');
                    resolve(new Database(db)); // Successfully connected, resolve with a new Database instance.
                }
            });
        });
    }
}
