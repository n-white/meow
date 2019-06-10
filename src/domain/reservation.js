module.exports = class Reservation {
  constructor({ id, roomId, guestId, start, end }) {
    this.id = id;
    this.roomId = roomId;
    this.guestId = guestId;
    this.start = new Date(start);
    this.end = new Date(end);
  }
}
