const Note = require("../models/Note");
const Ticket = require("../models/Ticket");

exports.newTicket = async (req, res) => {
  const { title } = req.body;

  try {
    const ticket = new Ticket({
      title,
      customer: req.user.id,
    });

    await ticket.save();
    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addNote = async (req, res) => {
  const { ticketId } = req.params;
  const { content, attachments } = req.body;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (!ticket.customer.equals(req.user.id) && req.user.role === "Customer") {
      return res.status(403).json({
        message: "You are not authorized to add notes to this ticket",
      });
    }

    const newNote = new Note({
      addedBy: req.user.id,
      content,
      attachments,
    });

    await newNote.save();

    ticket.notes.push(newNote);
    ticket.lastUpdatedOn = Date.now();

    await ticket.save();

    res.status(200).json({ message: "Note added successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    let tickets = [];
    if (req.user.role === "Admin" || req.user.role === "Agent") {
      tickets = await Ticket.find()
        .populate({
          path: "notes",
          populate: { path: "addedBy", select: "name" },
        })
        .populate({ path: "customer", select: "name" })
        .sort({ lastUpdatedOn: -1 });
    } else {
      tickets = await Ticket.find({ customer: req.user.id })
        .populate({
          path: "notes",
          populate: { path: "addedBy", select: "name" },
        })
        .populate({ path: "customer", select: "name" })
        .sort({
          lastUpdatedOn: -1,
        });
    }

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateTicketStatus = async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;

  // Validate the status
  if (!["Active", "Pending", "Closed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  // Check if the user is an Admin or Agent
  if (req.user.role !== "Admin" && req.user.role !== "Agent") {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Update the status
    ticket.status = status;
    ticket.lastUpdated = Date.now();

    await ticket.save();

    res
      .status(200)
      .json({ message: "Ticket status updated successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
