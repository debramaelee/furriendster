const express = require('express');
const Promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const dbConfig = require('./db-config');
const db = pgp(dbConfig);
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var numSaltRounds = 10;

const cors = require('cors');

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.post('/api/user/signup', (req, resp, next) => {
  let data = req.body;
  bcrypt.hash(data.password, 10)
    .then((encryptedPassword) =>
      db.one(`
        insert into owner_info
        values (default, $1, $2, $3, $4, $5, $6)
        returning name, email, phone, street, zip
        `,
        [
          data.name,
          data.email,
          data.phone,
          data.street,
          data.zip,
          encryptedPassword
        ]
      )
    )
    .then(data => resp.json(data))
    .catch(next);
});





app.listen(3003, () => console.log('Listening on 3003.'));