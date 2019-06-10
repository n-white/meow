const bodyParser = require('body-parser')
const clientSessions = require("client-sessions");
const cors = require('cors')
const db = require('./db');
const express = require('express')

const appDB = new db();

// ensure that the "proxy" entry in package.json
// matches this for development
const PORT = process.env.EXPRESS_PORT || 1337
const app = express()

app.use(bodyParser.json())
app.use(cors((req, callback) => callback(null, { credentials: true, origin: 'http://localhost:3000' })))
app.use(clientSessions({
  cookieName: 'session',
  secret: 'somesecret',
  duration: 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5,
}));

app.get('/healthcheck', (req, res) => res.send('Healthy'));

app.post('/user', (req, res) => {
  const user = req.body.userName
  if (user) {
    req.session.user = { user: user };
    res.status(200).send({
      success: true,
      user: user,
    }); 
  } else {
    res.status(400);
    res.send('no userName specified');
  }
});

app.post('/reservations/add', (req, res) => {
  if (req.session.user) {
    const body = req.body;
    const roomId = body.roomId;
    const guestId = body.guestId;
    const start = body.start;
    const end = body.end;

    appDB.db.run(
      `INSERT INTO reservations (roomId, guestId, start, end)
        VALUES (?, ?, ?, ?)`,
      [roomId, guestId, start, end], (err) => {
      if (err) {
        res.status(400).send({ message: 'add reservation failed' });
      } else {
        res.sendStatus(200);
      }      
    });
  } else {
    res.status(401).send(req.session);
  }
});

app.post('/reservations/cancel', (req, res) => {
  if (req.session.user) {
    const body = req.body;
    const reservationId = body.reservationId;

    appDB.db.run(`DELETE FROM reservations WHERE id = (?)`, [reservationId], (err) => {
      if (err) {
        res.status(400).send({ message: 'cancellation failed' });
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    res.status(401).send('please log in');
  }
});

app.get('/reservations', (req, res) => {
  if (req.session.user) {
    appDB.db.all('SELECT * FROM reservations', (err, result) => {  
      if (err) {
        res.status(400).send({ message: 'get reservations failed'});
      } else {
        res.send(result)
      }
    });
  } else {
    res.status(401).send('please log in');
  }
});

app.get('/rooms', (req, res) => {
  if (req.session.user) {
    appDB.db.all('SELECT * FROM rooms', (err, result) => {  
      if (err) {
        res.status(400).send({ message: 'get room failed'});
      } else {
        res.send(result)
      }
    });
  } else {
    res.status(401).send('please log in');
  }
});

app.get('/logout', (req, res) => {
  const previousUser = req.session.user;
  req.session.reset();

  res.status(200).send({
    success: false,
    user: previousUser,
  });  
});

if (module === require.main) {
  app.listen(PORT, () => {
    console.log(`Application listening at ${PORT}`)
  })
}

module.exports = app
