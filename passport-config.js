const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
 
const User = require('./models/user')
 
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};
 
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const user = await User.findOne({ email:jwt_payload.email })
      //const user = users.find(u => u.username === jwt_payload.username);
 
      if (user) {
        return done(null, true);
      }
 
      return done(null, false);
    })
  );
};