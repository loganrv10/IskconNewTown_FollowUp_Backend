const mongoose = require("mongoose");
const { stringify } = require("querystring");

const dotenv = require("dotenv");
dotenv.config();
const DB = process.env.DB;

//Connection To DataBase
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to the User Database.");
});

//User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "This Field is Required"],
  },
  phone: {
    type: String,
    required: [true, "This Field is Required"],
    unique: [true, "This Participant is already Exist"],
    validate: {
      validator: function () {
        return this.phone.length === 10;
      },
      message: "Phone number must be 10 digits.",
    },
  },
  location: {
    type: String,
  },
  currentLocation: {
    type: String,
  },
  shiftLocation: {
    type: String,
  },
  comment: {
    type: String,
  },
  registration_mode: {
    type: String,
    required: [true, "This Field is Required"],
  },
  round: {
    type: Number,
    required: [true, "This Field is Required"],
  },
  branch: {
    type: String,
    required: [true, "This Field is Required"],
  },
  paid_status: {
    type: String,
    required: [true, "This Field is Required"],
  },
  level: {
    type: Number,
    required: [true, "This Field is Required"],
  },
  registered_by: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "This Field is Required"],
  },
  handled_by: {
    type: Object,
  },
  grade: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "This Field is Required"],
  },
  marital_status: {
    type: String,
    required: [true, "This Field is Required"],
  },
  mode: {
    type: Boolean,
    required: [true, "This Field is Required"],
  },
  creted_at: {
    type: String,
  },
});

//middleware
userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next("This Participant is already Exist");
  } else {
    next(error);
  }
});

const usermodel = mongoose.model("devotees", userSchema);

module.exports = usermodel;
