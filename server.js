const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');

var app = express();

// var corsOptions = {
//     origin: "*"
// };
// app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/index');// connect to OUR database
require('./app/routes/spotify.routes.js')(app); // spotify auth/login
// require('./app/routes/users.routes.js')(app); // spotify auth/login
// require('./app/routes/songRequest.routes.js')(app); // spotify auth/login
require('./app/routes/gig.routes.js')(app); // spotify auth/login

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
