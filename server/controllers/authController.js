const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let isUserAlreadyExist = await User.findOne({ email });

    if (isUserAlreadyExist)
      return res
        .status(400)
        .json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    let newUser = new User({ name, email, password: hashedPass });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return res
        .status(404)
        .json({ message: "User does not exist with this email ID" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Entered password is incorrect" });
    }

    return res.status(200).json({ message: "Login Success ✅" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
 