import User from "../models/user.model.js";

export const findAll = async () => {
    return await User.find({}, { username: 1, products: 1, _id: 0 });
}

export const findOne = async username => {
    return await User.findOne({ username: username }, { username: 1, products: 1, _id: 0 });
}

export const create = async (username, products) => {
    return await User.updateOne(
        { username: username },
        {
            $push: {
                products: products
            }
        }
    )
}

export const update = async body => {
    const username = body.username;
    const product_id = body.product._id;
    const product_quantity = body.product.quantity;

    console.log("Update product for user:", username);

    return await User.updateOne(
        { username: username, "products._id": product_id },
        {
            $set: {
                "products.$.quantity": product_quantity
            }
        }
    )
}

export const deleteProduct = async params => {
    const username = params.username;
    const product_id = params.id;
    console.log("Delete product from user:", username);

    return await User.updateOne(
        { username: username },
        {
            $pull: {
                products: { _id: product_id }
            }
        }
    )
}

export const stats1 = async () => {
    console.log("For each user return total amount and num of products");

    return await User.aggregate([
        {
            $unwind: "$products"
        },
        {
            $project: {
                id: 1,
                username: 1,
                products: 1
            }
        },
        {
            $group: {
                _id: {
                    username: "$username",
                    product: "$products.product"
                },
                totalAmount: {
                    $sum: { $multiply: ["$products.cost", "$products.quantity"] }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.username": 1, "_id.product": 1 } }
    ])
}