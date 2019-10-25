const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local");
const config = require("../../config/config");
const { AccountModel } = require("../account/account.model");

// Setup options of local strategy
const localOptions = {
	usernameField: "email"
};

// Create local strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	// Verify this email and password
	// Call done with the user if correct email:password
	// Otherwise call done with false
	AccountModel.findOne({ email }).exec((err, user) => {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}

		// compare passwords - is 'password' equal to user.password?
		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}

			return done(null, user);
		});
	});
});

// Setup options for jwt strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
	secretOrKey: config.jwtSecret
};

// Create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
	const expirationDate = new Date(payload.exp * 1000);
	if (expirationDate < new Date()) {
		return done(null, false);
	}
	// See if the user ID in the payload exists in our database
	try {
		const user = await AccountModel.findById(payload._id);
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	} catch (error) {
		return done(err, false);
	}
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});
