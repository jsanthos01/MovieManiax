const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var notificationSchema = new mongoose.Schema({
	userName: String,
	reviewId: String,
	isRead: { type: Boolean, default: false }
});

module.exports = mongoose.model("notifications", notificationSchema);
