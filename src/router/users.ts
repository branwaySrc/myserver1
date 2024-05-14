import express from "express";
import { getAllUsers, deleteTheUser, updateUser } from "./../controllers/userController";
import { checkAuthentication, checkTheOwner } from "./../middlewares";

export default (router: express.Router) => {
	//if without checkAuthentication, everyone can query the data.(without cookie)
	//to avoid this situation, we need to check the cookie from auth middleware
	router.get("/users", checkAuthentication, getAllUsers);

	//if without checkTheOwner, everyone can delete the data.(without current same ID)
	//to avoid this situation, we need to check the id from auth middleware
	router.delete("/users/:id", checkAuthentication, checkTheOwner, deleteTheUser);

	router.patch("/users/:id", checkAuthentication, checkTheOwner, updateUser);
};
