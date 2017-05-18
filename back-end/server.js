const express = require('express');
const Promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const dbConfig = require('./db-config');
const db = pgp(dbConfig);
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
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

app.post('/api/user/login', (req, resp, next) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log('in login post');
  db.one(
    'select * from owner_info where email = $1',
    email)
    .then(owner_info =>
      [owner_info,
      bcrypt.compare(password, owner_info.password)])
      .spread((owner_info, matches)=> {
        if(matches){
          let token = uuid.v4();
          return [
            owner_info,
            db.one(
              `insert into login_session values
            ($1, default, $2) returning *`,
            [token, owner_info.id]
            )
          ];
        } else {
          throw new Error('Login failed');
        }
      })
      .spread((owner_info, loginSession) => {
        resp.json({
          name: owner_info.name,
          email: owner_info.email,
          phone: owner_info.phone,
          street: owner_info.street,
          zip: owner_info.zip,
          auth_token: loginSession.token

        });
      })
    .catch(next);
});





app.listen(3003, () => console.log('Listening on 3003.'));
