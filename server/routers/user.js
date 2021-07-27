const express = require("express");
const { body, param } = require("express-validator");

const userController = require("../controllers/user");

const router = express.Router();

router.get(
    "/check-username/:username",
    param("username")
        .trim()
        .isAlphanumeric()
        .withMessage("Username must be alpha-numeric"),
    userController.checkUsername
);

router.get(
    "/check-email/:email",
    param("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Email address is not valid"),
    userController.checkEmail
);

router.post(
    "/signup",
    [
        body("username")
            .not()
            .isEmpty()
            .withMessage("username cannot be empty")
            .trim()
            .escape()
            .isAlphanumeric()
            .withMessage("username must be alpha-numeric"),
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Email address is not valid!")
            .trim(),
        body("password")
            .trim()
            .isLength({ min: 8 })
            .withMessage("Password length must be at least 8 characters")
            .isLength({ max: 64 })
            .withMessage("Password must not be greater than 64 characters"),
    ],
    userController.signup
);

router.get("/confirmation/:token", userController.confirmation);

router.post(
    "/signin",
    [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Email address is not valid!"),
        body("password")
            .trim()
            .isLength({ min: 8 })
            .withMessage("Password length must be at least 8 characters")
            .isLength({ max: 64 })
            .withMessage("Password must not be greater than 64 characters"),
    ],
    userController.signin
);

router.post(
    "/forgot",
    [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Email address is not valid!"),
    ],
    userController.forgot
);

router.get("/forgotconfirmation/:token", userController.forgotconfirmation);

router.post(
    "/changepass",
    [
        body("id").trim().isNumeric().notEmpty().withMessage("User id not valid"),
        body("newPassword")
            .trim()
            .isLength({ min: 8 })
            .withMessage("Password length must be at least 8 characters")
            .isLength({ max: 64 })
            .withMessage("Password must not be greater than 64 characters"),
    ],
    userController.changepass
);

module.exports = router;