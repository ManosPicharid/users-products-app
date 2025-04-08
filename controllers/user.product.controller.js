import * as userProductService from "../services/user.product.services.js";

export const findAll = async (req, res) => {
    console.log("Find all user's products");

    try {
        const result = await userProductService.findAll();
        res.status(200).json({ status: true, data: result });
    } catch (err) {
        console.log("Problem in finding all users products");
        res.status(400).json({ status: false, data: err });
    }
}

export const findOne = async (req, res) => {
    console.log("Find products for specific user");

    try {
        const result = await userProductService.findOne(req.params.username);
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
    console.log("Insert products to user");
    const username = req.body.username;
    const products = req.body.products;

    try {
        const result = await userProductService.create(username, products);
        res.status(200).json({ status: true, data: result });
    } catch (err) {
        console.log("Problem in finding user's products", err);
        res.status(400).json({ status: false, data: err });
    }
}

export const update = async (req, res) => {

    try {
        const result = await userProductService.update(req.body);
        res.status(200).json({ status: true, data: result });
    } catch (err) {
        console.log("Problem in updating product", err);
        res.status(400).json({ status: false, data: err });
    }
}

export const deleteProduct = async (req, res) => {

    try {
        const result = await userProductService.deleteProduct(req.params);
        res.status(200).json({ status: true, data: result });
    } catch (err) {
        console.log("Problem in deleting product", err);
        res.status(400).json({ status: false, data: err });
    }
}

export const stats1 = async (req, res) => {

    try {
        const result = await userProductService.stats1();
        res.status(200).json({ status: true, data: result })
    } catch (err) {
        console.log("Problem in deleting product", err);
        res.status(400).json({ status: false, data: err });
    }
}