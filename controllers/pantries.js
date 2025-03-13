// controllers/pantries.js
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// GET
router.get('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Render index.ejs, passing in all of the current user's
    // pantries as data in the context object.
    res.render('pantries/index.ejs', {
      pantries: currentUser.pantries,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});
  
// GET /users/:userid/pantries/new
router.get('/new', async (req, res) => {
  res.render('pantries/new.ejs');
});

//POST /users/:userId/pantries
router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // pantries array of the current user
    currentUser.pantries.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the pantries index view
    res.redirect(`/users/${currentUser._id}/pantries`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

// DELETE /users/:userId/pantries/:pantriesId
//TODO: localhost doesnt have any delete functionality
router.delete('/:pantryId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // an pantry using the id supplied from req.params
    currentUser.pantries.id(req.params.pantryId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the pantries index view
    res.redirect(`/users/${currentUser._id}/pantries`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});


// GET/ EDIt
// GET /users/:userId/pantries/edit
//TODO: localhost doesnt have any edit functionality
router.get('/:pantryId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const pantry = currentUser.pantries.id(req.params.pantryId);
    res.render('pantries/edit.ejs', {
      pantry: pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

//PUT /users/:userId/pantries/:pantryId
// controllers/pantries.js`

router.put('/:pantryId', async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current pantry from the id supplied by req.params
    const pantry = currentUser.pantries.id(req.params.pantryId);
    // Use the Mongoose .set() method
    // this method updates the current pantry to reflect the new form
    // data on `req.body`
    pantry.set(req.body);
    // Save the current user
    await currentUser.save();
    // Redirect back to the show view of the current pantry
    res.redirect(
      `/users/${currentUser._id}/pantries/${req.params.pantryId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// router.get 
// route will be /pantryid
// first find pantry id then have res.render to show specific pantry/show.ejs


module.exports = router;
