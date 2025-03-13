// middleware/pass-user-to-view.js

const passUserToView = (req, res, next) => {
  // takes the user from req.session and provides access to res.locals
  // res.locals = what making available as part of the response, object thats included with 
  // the response that we can add to and make available to the templates 
  // anything we need to access in our templates globally can be added as a property to res.locals
  // res is start for response
  // generating templates is part of the response
  res.locals.user = req.session.user ? req.session.user : null;
    next();
  };
  
  module.exports = passUserToView;
  