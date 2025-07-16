const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let isUserAlreadyExist = await User.findOne({ email });

    if (isUserAlreadyExist)
      return res
        .status(400)
        .json({ userAlreadyExistMassage: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    let newUser = new User({ name, email, password: hashedPass });
    await newUser.save();

    res
      .status(201)
      .json({ registerUserMassage: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
