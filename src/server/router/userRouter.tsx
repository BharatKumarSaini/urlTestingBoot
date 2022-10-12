import express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import {ISignUpReq, ISignInReq} from '../../shared/interfaces/index';
/*
    @usage : Register a User
    @url : /api/users/register
    @fields : name , email , password
    @method : POST
    @access : PUBLIC
 */
router.post(
  '/register',
  [body('Phone').notEmpty().withMessage('Phone No. is Required')],
  async (request: ISignUpReq, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({errors: errors.array()});
    }
    try {
      let {phone} = request.body;

      // check if the user is exists
      let user = await User.findOne({phone: phone});
      if (user) {
        return response
          .status(401)
          .json({errors: [{msg: 'User is Already Exists'}]});
      }

      // encode the password
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      // save user to db
      user = new User({name, email, password});
      user = await user.save();
      response.status(200).json({msg: 'Registration is Success'});
    } catch (error) {
      console.error(error);
      response.status(500).json({errors: [{msg: error.message}]});
    }
  },
);

/*
    @usage : Login a User
    @url : /api/users/login
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */
router.post(
  '/login',
  [
    body('email').notEmpty().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is Required'),
  ],
  async (request: ISignInReq, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({errors: errors.array()});
    }
    try {
      let {email, password} = request.body;
      let user = await User.findOne({email: email});
      if (!user) {
        return response
          .status(401)
          .json({errors: [{msg: 'Invalid Credentials'}]});
      }
      // check password
      let isMatch: boolean = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response
          .status(401)
          .json({errors: [{msg: 'Invalid Credentials'}]});
      }

      // create a token
      let payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        {expiresIn: 360000000},
        (err, token: string) => {
          if (err) {
            throw err;
          }
          response.status(200).json({
            msg: 'Login is Success',
            token: token,
          });
        },
      );
    } catch (error) {
      console.error(error);
      response.status(500).json({errors: [{msg: error.message}]});
    }
  },
);
