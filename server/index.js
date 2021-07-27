const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const sequelize = require('./data/db.js');
const cors = require('cors');
const userRouter = require("./routers/user");
const profileRouter = require("./routers/profile");

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

const app = next({ dev })
const handle = app.getRequestHandler()

app
    .prepare()
    .then(async () => {
        const server = express()

        server.use(bodyParser.json())
        server.use(cors({ credentials: true, origin: true }));
        server.use(
            bodyParser.urlencoded({
                extended: false,
            })
        );

        server.use("/api/user", userRouter);
        server.use("/api/profile", profileRouter);

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        console.log('Current Environment: ' + process.env.NODE_ENV);

        await sequelize.sync().then(() => {
            server.listen(process.env.PORT, (error) => {
                if (error) throw console.log('error: ', error);
                console.log(`Server is listening on   ${process.env.BASE_URL}:${process.env.PORT} !`)
            })
        })
    }).catch(e => {
        console.log('Catch error:', e.message);
    })