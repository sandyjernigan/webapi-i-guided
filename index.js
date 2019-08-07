// libraries
const express = require('express');

// other files
const db = require('./data/hubs-model.js')


// global objects
const server = express();

// middleware
server.use(express.json());

// request handler

server.get('/', (req, res) => {
  // what is the datatype?
  // what is the status code?
  // what is to be sent back?
  res.send('Hello world');
});

// send back a timestamp
server.get('/time', (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

// GET /hubs
server.get('/hubs', (req, res) => {
  db.find()
    .then(hubs => {
      res.json(hubs);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to get hubs'
      })
    })
})

// POST /
// send back a timestamp
server.post('/hubs', (req, res) => {
  const newHub = req.body;
  // May consider -> validate the hub
  db.add(newHub)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to create new hub'
      })
    })
})

// DESTROY /hubs/:id
server.delete('/hubs/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deletedHub => {
      res.json(deletedHub);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to remove hub'
      })
    })
});

// PUT /hubs/:id
server.put('/hubs/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(deletedHub => {
      if (updated) {
        res.json(updated)
      } else {
        res.status(404).json({
          message: 'invalid hub id'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to update hub'
      })
    })
});

server.get('/hubs/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(hub => {
      if (hub) {
        res.json(hub)
      } else {
        res.status(404).json({
          message: 'invalid hub id'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to get hub by id'
      })
    })
});


// should be the last step
server.listen(4000, () => {
  console.log('Server is running on port 4000.');
});