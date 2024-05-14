import express from "express";
import { deleteUserById, getUserById, getUsers } from "../models/Users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
	try {
		const users = await getUsers();
		return res.status(200).json(users);
	} catch (error) {
		console.log(error);
		return res.send("Error from getAllUsers").status(400);
	}
};

export const deleteTheUser = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;
		const deletedUser = await deleteUserById(id);
		return res.json(deletedUser);
	} catch (error) {
		console.log(error);
		return res.send("Error from deleteUser").status(400);
	}
};

export const updateUser = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;
		const { username } = req.body;

		if (!username) {
			return res.send("No username").status(400);
		}

		const user = await getUserById(id);
		user.username = username;
		await user.save();

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.send("Error from updateUser").status(400);
	}
};
