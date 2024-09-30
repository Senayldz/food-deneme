const Carts = require("../models/Carts");

// Get carts with email
const getCartsByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const query = { email: email };
        const result = await Carts.find(query).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Post a cart button clicked
const addToCart = async (req, res) => {
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body;

    if (!menuItemId || !name || !price || !quantity || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Check if the item already exists in the cart
        const existingCartItem = await Carts.findOne({ menuItemId, email });

        if (existingCartItem) {
            // If item exists, update the quantity
            existingCartItem.quantity += quantity;
            const updatedCartItem = await existingCartItem.save();
            res.status(200).json(updatedCartItem);
        } else {
            // If item doesn't exist, create a new cart item
            const cartItem = await Carts.create({ menuItemId, name, recipe, image, price, quantity, email });
            res.status(201).json(cartItem);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete item
const deleteCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const deletedCart = await Carts.findByIdAndDelete(cartId);
        if (!deletedCart) {
            return res.status(401).json({ message: "Cart item not found!" });
        }
        res.status(200).json({ message: "Cart item deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a cart item
const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
    try {
        const updatedCart = await Carts.findByIdAndUpdate(cartId, { menuItemId, name, recipe, image, price, quantity, email }, { new: true, runValidators: true });
        if (!updatedCart) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single cart item
const getSingleCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const cartItem = await Carts.findById(cartId);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCartsByEmail,
    addToCart,
    deleteCart,
    updateCart,
    getSingleCart
};
