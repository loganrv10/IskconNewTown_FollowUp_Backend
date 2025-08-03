const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.port;
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://iskconnewtownfollowups.netlify.app"],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // ✅ Required for cookies/auth headers
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ Handles preflight requests

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routers
const userrouter = require('./routers/userrouter');
app.use('/devotee', userrouter);

const adminrouter = require('./routers/adminrouter');
app.use('/admin', adminrouter);

const sessionrouter = require('./routers/sessionrouter');
app.use('/session', sessionrouter);

const attendancerouter = require('./routers/attendancerouter');
app.use('/attendance', attendancerouter);

const remarkrouter = require('./routers/remarkrouter');
app.use('/remark', remarkrouter);

// Static images
app.use('/public', express.static('./public'));

app.listen(port, (err) => {
  if (err) {
    console.log("error while creating server");
    return;
  }
  console.log("server is running at", port);
});
