import * as userService from "../services/user.services.js";
import { logger } from "../logger/logger.js";

export const findAll = async (req, res) => {
    console.log("Find all users from collection users");

    try {
        const result = await userService.findAll();
        res.status(200).json({ status: true, data: result });
        logger.info("INFO, Success in reading all users")
        // logger.warn("WARN, Success in reading all users")
        // logger.error("Message with error")
    } catch (err) {
        console.log("Problem in reading users", err);
        logger.error("ERROR, Problem in reading all users, err")
        res.status(400).json({ status: false, data: err });
    }
}

export const findOne = async (req, res) => {
    console.log("Find user with specific username");
    let username = req.params.username;

    try {
        const result = await userService.findOne(username);
        if (result) {
            res.status(200).json({ status: true, data: result });
        } else {
            res.status(404).json({ status: false, data: "User not exist" })
        }
    } catch (err) {
        console.log("Problem in finding user", err);
        res.status(400).json({ status: false, data: err });
    }
}

export const create = async (req, res) => {
    console.log("Create User");

    try {
        const result = await userService.create(req.body);
        res.status(200).json({ status: true, data: result });
    } catch (err) {
        console.log("Problem in creating user", err);
        res.status(400).json({ status: false, data: err });
    }
}

export const update = async (req, res) => {
    const username = req.body.username;
    console.log("Update user with username", username);

    try {
        const result = await userService.update(username, req.body);
        res.status(200).json({ status: true, data: result });
    } catch (err) {
        console.log("Problem in updating user", err);
        res.status(400).json({ status: false, data: err });
    }
}

export const deleteByUsername = async (req, res) => {
    const username = req.params.username;
    console.log("Delete user with username", username);

    try {
        const result = await userService.deleteByUsername(username);
        res.status(200).json({ status: true, data: result });
    } catch (err) {
        console.log("Problem in deleting user", err);
        res.status(400).json({ status: false, data: err });
    }
}

export const deleteByEmail = async (req, res) => {
    const username = req.params.username;
    const email = req.params.email;
    console.log("Delete user with email", email);

    try {
        const result = await userService.deleteByEmail(email);
        res.status(200).json({ status: true, data: result });
    } catch (err) {
        console.log("Problem in deleting user by email", err);
        res.status(400).json({ status: false, data: err });
    }
}