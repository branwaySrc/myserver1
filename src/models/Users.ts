import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	authentication: {
		password: { type: String, required: true, select: false },
		salt: { type: String, select: false },
		sessionToken: { type: String, select: false },
	},
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
	UserModel.findOne({
		"authentication.sessionToken": sessionToken,
	});
// I've replace the value type as UserSchema
// whereas values Could be replaced with
// @type Record<string,any> according to video
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then(newUser => newUser.toObject);
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
