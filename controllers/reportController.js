// controllers/reportController.js
const IssueReport = require("../models/IssueReport.js");

const reportIssue = async (req, res) => {
  try {
    const { email, confirm_email, comment, problem_type } = req.body;

    console.log("Received data:", req.body); // Log the received data for debugging

    // Validate required fields
    if (!email || !confirm_email) {
      return res.status(400).send("All required fields must be filled out");
    }

    // Check if emails match
    if (email !== confirm_email) {
      return res.status(400).send("Emails do not match");
    }

    // Check if problem_type is an array and has values
    if (!Array.isArray(problem_type) || problem_type.length === 0) {
      return res.status(400).send("At least one problem type must be selected");
    }

    // Create new issue report
    const newIssueReport = new IssueReport({
      email,
      confirmEmail: confirm_email,
      comment,
      problemTypes: problem_type, // Add problemTypes field
    });

    await newIssueReport.save();

    // Redirect to a page informing the user that the report was successful
    res.status(200).send("Issue reported successfully. Thank you for your feedback.");
  } catch (error) {
    console.error("Error in reportIssue controller:", error); // Log the error for debugging
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  reportIssue,
};
