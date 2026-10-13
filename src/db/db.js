export const DATABASE_NAME = 'expenses.db';

export async function initDb(db) {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            amount REAL NOT NULL,
            spent_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
}

export async function listExpenses(db) {
    return await db.getAllAsync('SELECT * FROM expenses ORDER BY id DESC;');
}

export async function addExpenses(db, title, amount) {
    await db.runAsync(
        'INSERT INTO expenses (title, amount) VALUES (?, ?);',
        [title, amount]
    );
}

export async function totalExpense(db) {
    const result = await db.getFirstAsync('SELECT SUM(amount) as total FROM expenses;');
    return result?.total ?? 0;
}

export async function deleateExpenses(db, id) {
    await db.runAsync('DELETE FROM expenses WHERE id = ?;', [id]);
}
