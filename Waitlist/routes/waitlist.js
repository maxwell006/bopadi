const express = require("express");
const router = express.Router();
const {
  joinWaitlist,
  broadcastMessage,
  getAllWaitlist 
} = require("../controller/waitlistController");

router.post("/join", joinWaitlist);
router.post("/broadcast", broadcastMessage);
router.get("/all", getAllWaitlist);

module.exports = router;
