const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authModel } = require("../../models/authModel/authModel");

const authRegisterController = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).send({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if user already exists
    const existingUser = await authModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists.",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new authModel({
      name,
      email,
      password: hashedPassword,
      isStudent: role === 'student',
      isTeacher: role === 'teacher'
    });

    await newUser.save();

    return res.status(201).send({
      success: true,
      message: "User created successfully.",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while creating the user.",
    });
  }
};

const authLoginController = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body

    const secretKey = process.env.SECRETE_KEY;
    
    const options = {
      expiresIn: '1h',
    };

    const data = await authModel.findOne({ email: email })

    //     console.log(data);

    const payload = {
      email: data.email,
    };

    if (!data) {
      return res.status(400).send({
        success: false,
        message: "User not found"
      })
    }

    const isValidPassword = await bcrypt.compare(password, data.password)
    if (!isValidPassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password"
      })
    }

    // Create the token
    const jwtToken = jwt.sign(payload, secretKey, options);
    console.log(jwtToken);

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      data: {
        user: data,
        token: jwtToken,
      },
    })

  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Have an error while login"
    }
    )
  }
}

// get current user details
const getCurrentUserController = async (req, res) => {
  try {
    // console.log(req.body);
    
      const user = await authModel.findOne({ email: req.body.email })
      console.log(user);

      if (!user) {
          res.status(404).send({
              message: "User Cannot find !!",
              success: false
          })
      }

      res.status(200).send({
          message: "Details found",
          success: true,
          user
      })

  } catch (error) {

      res.status(400).send({
          message: "Error occured while login ",
          success: false
      })

  }
}

module.exports = { authRegisterController, authLoginController , getCurrentUserController };
