const User = require("../../models/user.js");
const firebaseAdmin = require('../../config/firebase');

exports.loginUser = async (req, res) => {
    let {uid, email, name, role, createdAt} = req.body;
    createdAt = new Date(createdAt).toISOString().slice(0, 19).replace('T', ' ');
    User.addLoginLog({uid, email, name, role, createdAt}, async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while login the User"
            });
        else {
            await firebaseAdmin.auth().setCustomUserClaims(uid, {role: role, name: name})
            return res.status(200).json({data: data})
        }
    })
}

exports.upgradeUser = async (req, res) => {
    const { uid } = req.body;
    await firebaseAdmin.auth().setCustomUserClaims(uid, {role: 'admin'})
    return res.status(200).send({uid});
}

// Create and Save a new Customer
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const {email, password, name, role, createdAt} = req.body;
    const user = await firebaseAdmin.auth().createUser({email, password, name, role, createdAt});

    res.send(user);
    // const customer = new User({
    //     email: req.body.email,
    //     name: req.body.name,
    //     active: req.body.active
    // });
    //
    // // Save Customer in the database
    // User.create(customer, (err, data) => {
    //     if (err)
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Customer."
    //         });
    //     else res.send(data);
    // });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    User.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.customerId
                });
            }
        } else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    User.updateById(
        req.params.customerId,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.customerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.customerId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    User.remove(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.customerId
                });
            }
        } else res.send({message: `Customer was deleted successfully!`});
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        else res.send({message: `All Customers were deleted successfully!`});
    });
};