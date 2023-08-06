import axios from "axios";
import { PROJECT_ID, PRIVATE_KEY } from "../config.js";
import User from "../models/User.js";

export const postLogin = async (req, res) => {
  try {
    const { password, username } = req.body;

    const { name } = await User.findOne({ username });

    const chatEngineResponse = await axios.get(
      `https://api.chatengine.io/users/me `,
      {
        headers: {
          "Project-ID": PROJECT_ID,
          "User-Name": name,
          "User-Secret": password,
        },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const postSignup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const user = new User({
      username,
      secret: password,
      email,
      name,
    });

    await user.save();

    const chatEngineResponse = await axios.post(
      `https://api.chatengine.io/users/ `,
      {
        username: name,
        secret: password,
        first_name: name,
        email,
      },
      {
        headers: { "Private-key": PRIVATE_KEY },
      }
    );
    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
