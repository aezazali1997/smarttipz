const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");

const router = express.Router();

const profileController = require("../controllers/profile");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "pictures");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

router.get("/", profileController.main);

router.post(
    "/uploadpic",
    [body("picture").notEmpty().trim().isString().isURL()],
    multer({ storage: fileStorage, fileFilter: fileFilter }).single("picture"),
    profileController.uploadPic
);

module.exports = router;