import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import UserModel from "../models/User";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    // Verify the Google token using the Google Auth Library
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Get the user information from the token
    const googleUser = ticket.getPayload();

    if (!googleUser) {
      res
        .status(400)
        .json({ error: "Google user not found in the token payload." });
      return;
    }

    let user = await UserModel.findOne({ email: googleUser.email });

    if (!user) {
      user = new UserModel({
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      });
      await user.save();
    }

    // Create a JWT token for the user
    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    console.log("ticket", user);
    // Send the JWT token to the frontend
    res.json({
      success: true,
      message: "user Sign In successfully.",
      data: { user, token: jwtToken },
    });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
