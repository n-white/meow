const sqlite3 = require('sqlite3').verbose();

const createRoomsTableSql = 'CREATE TABLE IF NOT EXISTS rooms (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)';
const createReservationsTableSql = 'CREATE TABLE IF NOT EXISTS reservations (id INTEGER PRIMARY KEY AUTOINCREMENT, roomId INTEGER, guestId TEXT, start TEXT, end TEXT)';

class AppDB {
  constructor() {
    this.db = new sqlite3.Database(':memory:');
    // seed DB with default rooms data
    this.db.serialize(() => {
      this.db.run(createRoomsTableSql);
      this.db.run(createReservationsTableSql);

      let stmt = this.db.prepare("INSERT INTO rooms (name) VALUES (?)");
      stmt.run('Single');
      stmt.run('Double');
      stmt.run('Queen');
      stmt.run('King');
      stmt.finalize();      
    });
  }
}

module.exports = AppDB;