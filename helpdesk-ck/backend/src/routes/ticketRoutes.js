const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  newTicket,
  addNote,
  getTickets,
  updateTicketStatus,
} = require("../controllers/ticketController");

// Route for user registration
router.post("/", authMiddleware, newTicket);

// Route for adding note to a ticket
router.put("/:ticketId/note", authMiddleware, addNote);

// Route for getting all tickets of a user
router.get("/", authMiddleware, getTickets);

// Route for updating ticket status
router.patch("/:ticketId/status", authMiddleware, updateTicketStatus);

module.exports = router;
