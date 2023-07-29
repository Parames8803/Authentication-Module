const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const session = require('express-session')



const app = express()

app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}))

// app.use(session({
//     key : 'formik',
//     secret : 'prem8803',
//     save : false,
//     saveUninitialized : false,
//     cookie : {
//         maxAge : 60 *60 * 24
//     }
// }))

app.use(bodyParser.urlencoded({ extended: true }))


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'formik'
})

app.post('/api/signup', (req, res) => {
    let username = req.body.username;
    let email = req.body.email
    let password = req.body.password
    // console.log(password)
    // console.log(username)
    // console.log(email)

    const checkuser = 'select * from user where ( username = ? || email = ? );'
    db.query(checkuser, [username, email], (error, result) => {
        if (error) {
            console.log({ error })
        } else if (result.length != 0) {
            res.status(400).send('Username or email are already exists')
        } else {
            console.log('inserted')
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.log({ err })
                } else {

                    const insert = 'insert into user (username,email,password) values (?,?,?);'

                    db.query(insert, [username, email, hash], (error, result) => {
                        if (error) {
                            res.status(400).send({ err: error })
                        } else {
                            res.send({ result })
                            // console.log(result)
                        }
                    })
                }
            })
        }
    })



})


app.post('/api/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    // let email = req.body.email
    // console.log(password)

    const checkusername = 'select * from user where username = ?;'

    db.query(checkusername, username, (err, result) => {
        if (err) {
            res.status(400).send({ err: err })
        } else {
            if (result.length > 0) {
                // console.log(result)
                const checkpass = 'select password from user where username = ?;'

                db.query(checkpass, username, (err, data) => {
                    if (err) {
                        res.status(400).send({ err: err })
                    } else {
                        // console.log(data[0].password)
                        let pass = data[0].password

                        const com = bcrypt.compare(password, pass).then(
                            passcheck => {
                                if (passcheck == true) {
                                    console.log(result)
                                    res.send(result)

                                } else {
                                    res.status(400).send('incorrect password')
                                }
                            }
                        )
                    }
                })
            } else {
                res.status(404).send('incorrect Username')
            }
        }
    })
})


app.listen(5000, (req, res) => {
    console.log(`Server is Running on Port : http://localhost:5000`)
})






