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

app.get('/api/petpage/:id', (req, resp, next)=> {
  let id = req.params.id;
  db.oneOrNone(`select * from pet_info where id = $1`, id)
    .then(data=> {
      if (data) {
      resp.json(data);
    }
    else {
      resp.status(404);
      resp.json({
        message: "Pet not found."
      });
    }
  })
  .catch(next);
});

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

app.get('/api/owner_info', (req, resp, next)=>{
  db.any(
    `select id, street, zip from owner_info`
  )
  .then(data=> {
    if (data) {
    resp.json(data);
  }
  else {
    resp.status(404);
    resp.json({
      message: "Data not found."
    });
  }
})
.catch(next);
});




function respondUnauthorized(resp) {


  resp.status(403);
  resp.json({
    message: 'Unauthorized'
  });
}

app.use(function authorization(req, resp, next) {
  let token = req.body.token;
  // let token = loginSession.token;
  console.log(token)

  if (!token) {
    respondUnauthorized(resp);
    return;
  }

  db.oneOrNone(`select * from login_session where token = $1`, token)
    .then(loginSession => {
      if (!loginSession) {
        respondUnauthorized(resp);
        return;
      }
      req.loginSession = loginSession;
      next();
    })
    .catch(next);
});

app.post('/api/petprofile', (req, resp, next)=>{
  let data = req.body;
  let ownerId = req.loginSession.owner_id;
  db.one(`
    insert into pet_info values
    (default, $1, $2, $3, $4, $5, $6, $7, $8)
    returning * `, [ownerId, data.name, data.gender, data.fixed, data.age, data.size, data.personality, data.activities])
    .then(data =>resp.json(data))
    .catch(next);
});

// app.post('/api/petprofile', (req, resp, next) => {
//   let data = req.body;
  // let owner_id = 3;
  //commented this out because it was breaking everything
  // db.one(
  //   `select id from owner_info join pet_info on owner_info.id = pet_info.owner_id`
  // )
//   .then(function(inserting){
//       db.one(`
//         insert into pet_info
//         values (default, NULL, $1, $2, $3, $4, $5, $6, $7)
//         returning owner_id, name, gender, fixed, age, size, personality, activities
//         `,
//         [
//           data.name,
//           data.gender,
//           data.fixed,
//           data.age,
//           data.size,
//           data.personality,
//           data.activities
//         ]
//       )
//     })
//     .then(data => resp.json(data))
//     .catch(next);
// });

// app.post('/api/petprofile', (req, resp, next) => {
//
//   console.log('pet info');
//   let data = req.body;
//   db.one(
//     'select * from login_session where token = $1',
//     token)
//           return [
//             login_session,
//             db.one(
//               `
//                 insert into pet_info
//                 values (default, $1, $2, $3, $4, $5, $6, $7, $8)
//                 returning owner_id, name, gender, fixed, age, size, personality, activities
//                 `,
//                 [
//                   owner_id,
//                   data.name,
//                   data.gender,
//                   data.fixed,
//                   data.age,
//                   data.size,
//                   data.personality,
//                   data.activity
//                 ]
//             )
//
//
//           ];
//           // .then(data => resp.json(data))
//           // .catch(next);
//         })








app.listen(3003, () => console.log('Listening on 3003.'));
