const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({},
	(username, password, done) => {
    console.log("helloooo thereeeee bitches\n");
		User.findOne({ username: username },(err, user) => {
      if(err){
        console.log("errore on login\n");
        return done(err);
      }
      if(!user || !(user.validatePassword(password))){
        console.log(false+ "False wrong username or password on login");
        return done(null, false, { message: "Incorrect username or password." });
      }
      console.log(true + "User logged In on login \n");
      console.log(user);
      return done(null,user);
		});
	}
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PUBLIC_KEY
  },
  function (jwtPayload, callback) {
    return User.findOne({username: jwtPayload.username})
    .then(user => {
      console.log("autenticato con jtw\n");
      return callback(null, user);
    })
    .catch(err => {
      return callback(err);
    });
  })
);