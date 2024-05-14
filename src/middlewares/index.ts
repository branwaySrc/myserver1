import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "./../models/Users";

export const checkTheOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const { id } = req.params;
		const currentUserId = get(req, "identity._id") as string;

		if (!currentUserId) {
			return res.send("No currentUserId Error").status(403);
		}

		if (currentUserId.toString() !== id) {
			return res.send("Invalid id from params Error").status(403);
		}

		next();
	} catch (error) {
		console.log(error);
		return res.send("checkTheOwner Error").status(400);
	}
};

export const checkAuthentication = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const sessionToken = req.cookies[process.env.COOKIE];
		if (!sessionToken) {
			return res.send("No sessionToken").status(403);
		}

		const existingUser = await getUserBySessionToken(sessionToken);

		if (!existingUser) {
			return res.send("No User Exist from Checking Authentication").status(403);
		}

		merge(req, { identity: existingUser });
		return next();
	} catch (error) {
		console.log(error);
		return res.send("checkAuthentication Error").status(400);
	}
};
