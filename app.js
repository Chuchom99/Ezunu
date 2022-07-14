require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(session({
  secret: process.env.CLIENT_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());




const enu = {
  values: ["selfEmploye", "enterprenuer", "civilServant", "student"],
  message: 'Status is required.'
};
const idEnu = {
  values: ["intPassport", "nationalId", "driversLiscence", "votersCard", "employeeIdCard"],
  message: 'Status is required.'
};

mongoose.connect('mongodb+srv://chuchom99:Twiste11@cluster0.mfaxh.mongodb.net/bankUserDb', {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  phone: Number,
  firstName: String,
  middleName: String,
  lastName: String,
  dob: Date,
  nationality: String,
  state: String,
  address: String,
  zipCode: Number,
  Phone: Number,
  email: String,
  balance: Number

});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.get("/", function(req, res) {
  res.render("home");
});
app.get("/instant-account", function(req, res) {
  res.render("instant-account");
});
app.get("/register", function(req, res) {
  res.render("register");
});
app.get("/account", function(req, res) {
  const welcome = "welcome";
  const userName = req.body.username;
  // const requestedUserId =
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, users) {
      if (err) {
        console.log(err);
      } else {
        res.render(
          "account", {
            user: users
          });
      }
    })
  } else {
    res.redirect("/login");
  }

});
app.get("/login", function(req, res) {
  res.render("login")
});
app.get("/logout", function(req, res) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
app.get("/logout", function(req, res) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.post("/register", function(req, res) {


  User.register({
    username: req.body.username,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    dob: req.body.dob,
    nationality: req.body.nationality,
    state: req.body.state,
    address: req.body.address,
    zipCode: req.body.zipCode,
    email: req.body.email,
    balance: req.body.balance

  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register")
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/account")
      })
    }
  })
});
app.post("/login", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/account")
      });
    }
  });
});

app.post("/customer", function(req, res) {
  const customer = new Customer({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    occupation: req.body.occupation,
    id: req.body.id,
    dob: req.body.dob,
    password: req.body.password,
    nationality: req.body.nationality,
    state: req.body.state,
    address: req.body.address,
    zipCode: req.body.zipCode,
    Phone: req.body.phone,
    email: req.body.email,
  })
  customer.save(function(err) {
    if (err) {
      console.log(err);
    }
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
