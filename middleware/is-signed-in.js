// middleware/is-signed-in.js

const isSignedIn = (req, res, next) => {
  // if the user is signed in, call the next() middleware function
  // otherwise, redirect to sign in page
    if (req.session.user) return next();
    res.redirect('/auth/sign-in');
  };
  
  module.exports = isSignedIn;
  
