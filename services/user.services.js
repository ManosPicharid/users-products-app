import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const findAll = async () => {
    return await User.find();
}

export const findOne = async username => {
    return await User.findOne({ username: username });
}

export const create = async (data) => {
    const saltOrRounds = 10;
    let hashedPassword = ""
    if (data.password) {
        hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
    }
    const newUser = new User({
        username: data.username,
        password: hashedPassword,
        name: data.name,
        surname: data.surname,
        email: data.email,
        address: {
            area: data.address.area,
            road: data.address.road
        }
    });

    return await newUser.save();
}

export const update = async (username, data) => {
    const updateUser = {
        name: data.name,
        surname: data.surname,
        email: data.email,
        address: {
            area: data.address.area,
            road: data.address.road
        }
    };

    return await User.findOneAndUpdate({ username }, updateUser, { new: true });
}

export const deleteByUsername = async (username) => {
    return await User.findOneAndDelete({ username: username });
}

export const deleteByEmail = async (email) => {
    return await User.findOneAndDelete({ email: email });
}

export const findLastInsertedUser = async () => {
    console.log("Find last inserted user")
    try {
        let result = await User.find().sort({ _id: -1 }).limit(1);
        result = result[0];
        return result
    } catch (err) {
        console.log("Error in finding user:", err);
        return false
    }
}