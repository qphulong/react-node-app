const getIncoming = require("../controllers/incoming");
const express = require("express");
const router = express.Router();

router.get("/", getIncoming.getIncomingProfile);
//lấy username đang đăng nhập

module.exports = router;
