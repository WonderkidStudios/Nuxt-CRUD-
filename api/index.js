import express from 'express'
import mysql from 'mysql'

const config = {
  database: "nuxt-start",
  host: "localhost",
  user: "root",
  password: ""
}
let db;

function handleDisconnect() {
  db = mysql.createConnection(config)
  db.connect();
  db.on('error', function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect()
    } else {
      throw err
    }
  });
}
handleDisconnect()

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

function getById(id, ok, fail) {
  db.query("SELECT * from users where id=?", id, function (err, rows) {
    err ? (fail && fail(err)) : ok(rows[0])
  })
}

router.post('/users', (req, res, next) => {
  db.query("SELECT * from users", function (err, rows) {
    err ? res.status(500, err) : res.status(200).json(rows)
  })
})

router.get('/user/:id', (req, res, next) => {
  if (/^\d+$/.test(req.params.id) && req.params.id > 0) {
    getById(req.params.id, user => res.status(200).json(user), e => res.status(500, e))
  } else {
    next()
  }
})

router.post('/user', (req, res, next) => {
  let user = req.body
  if (/^\d+$/.test(user.id) && user.id > 0) {
    db.query("UPDATE users set ? where id=?", [user, user.id], function (err, rows) {
      err ? res.status(500, err) : res.status(200).json(user)
      //getById(user.id, user => res.status(200).json(user), e => res.status(500, e))
    })
  } else {
    next()
  }
})

router.put('/user', (req, res, next) => {
  let user = req.body
  db.query("INSERT into users set ?", user, function (err, result) {
    if (err) {
      res.status(500, err)
    } else {
      getById(result.insertId, user => res.status(200).json(user), e => res.status(500, e))
    }
  })
})

router.delete('/user/:id', (req, res, next) => {
  if (/^\d+$/.test(req.params.id) && req.params.id > 0) {
    db.query("DELETE from users where id=?", req.params.id, function (err, rows) {
      err ? res.status(500, err) : res.status(200).json({})
    })
  } else {
    res.status(404, 'User not found')
  }
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
