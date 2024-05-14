import express from "express";
import { createUser, getUserByEmail } from "./../models/Users";
import { authentication, random } from "./../helpers";

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.send("invalid login").status(400);
		}

		//check the video https://www.youtube.com/watch?v=b8ZUb_Okxro on 31:09
		const AUTH_OBJECT_DATA = "+authentication.salt +authentication.password";
		const user = await getUserByEmail(email).select(AUTH_OBJECT_DATA);
		if (!user) {
			return res.send("no user").status(400);
		}

		const expectedHash = authentication(user.authentication.salt, password);
		if (user.authentication.password !== expectedHash) {
			return res.send("invalid account").status(403);
		}

		const salt = random();
		user.authentication.sessionToken = authentication(salt, user._id.toString());

		await user.save();
		res.cookie(process.env.COOKIE, user.authentication.sessionToken, { domain: "localhost", path: "/" });

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, username } = req.body;
		if (!email || !password || !username) {
			return res.sendStatus(400);
		}

		const existingUser = await getUserByEmail(email);
		if (existingUser) {
			return res.sendStatus(400);
		}

		const salt = random();
		const newUser = await createUser({
			email,
			username,
			authentication: {
				salt,
				password: authentication(salt, password),
			},
		});

		return res.send("Welcome").status(200).json(newUser).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
