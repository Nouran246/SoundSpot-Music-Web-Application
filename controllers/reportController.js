// controllers/reportController.js
const IssueReport = require("../models/IssueReport.js");

const reportIssue = async (req, res) => {
  try {
    const { problem_type, email, confirm_email, comment } = req.body;

    console.log("Received data:", req.body); // Log the received data for debugging

    // Validate required fields
    if (!problem_type || !email || !confirm_email) {
      return res.status(400).send("All required fields must be filled out");
    }

    // Check if emails match
    if (email !== confirm_email) {
      return res.status(400).send("Emails do not match");
    }

    // Create new issue report
    const newIssueReport = new IssueReport({
      problemTypes: Array.isArray(problem_type) ? problem_type : [problem_type],
      email,
      confirmEmail: confirm_email,
      comment,
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
