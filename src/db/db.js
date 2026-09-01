export const DATABASE_NAME = 'expense_basic.db'

export async function initDb(db) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL<
            amount INTEGER NOTNULL,
            spent_at    TEXT    NOTNULL
        )
     `)
    
}
export function listExpenses(db) {
    return db.getAllAsync('SELECT * FROM expenses ORDER BY id DESC')
}

export async function totalExpense(db) {
    const row = await db.getFirstAsync('SELECT SUM(amount) AS total FROM expenses')
    return row?.total ?? 0
}

export async function addExpenses(db,amount) {
    const today = new Date().toISOString().slice(0,10)
    const result = await db.runAsync(
        'INSERT INTO expenses(title,amount,spent_at) VALUES (?,?,?)',[title,amount,spent_at]
    ) 
    return result.lastInsertRowId
}

export async function deleateExpenses() {
    const result = await db.runAsync('DELEATE FROM expenses WHERE id =?',[id])
    return result.changes
    
}