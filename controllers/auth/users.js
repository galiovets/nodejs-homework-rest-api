const { Conflict, Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");
const { JWT_SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  console.log(avatarURL);
  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email,
      subscription: "starter",
      avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }

  const passCompare = bcrypt.compareSync(password, user.password);

  if (!passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({
    message: "no content",
  });
};

const updateSubscription = async (req, res) => {
  const { _id: owner } = req.user;
  const { userId } = req.params;
  const { subscription } = req.body;

  const result = await User.findOneAndUpdate(
    { _id: userId, owner },
    { subscription },
    {
      new: true,
    }
  );

  if (!result) {
    res.status(404).json({
      message: "Not found",
    });
  }

  res.json(result);
};

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(
      __dirname,
      "../../",
      "public",
      "avatars",
      imageName
    );

    Jimp.read(tempUpload)
      .then((image) => {
        return image.resize(250, 250).write(tempUpload);
      })
      .catch((err) => {
        next(err);
      });

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = {
  signUp,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
