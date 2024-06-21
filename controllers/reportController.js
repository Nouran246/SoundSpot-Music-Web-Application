// controllers/reportController.js
const IssueReport = require("../models/IssueReport.js");

const reportIssue = async (req, res) => {
  try {
    const { email, confirm_email, comment, problem_type } = req.body;

    console.log("Received data:", req.body); // Log the received data for debugging

    const errors = {};

    // Validate required fields
    if (!email || !confirm_email) {
      errors.email = "All required fields must be filled out";
    }

    // Check if emails match
    if (email !== confirm_email) {
      errors.email = "Emails do not match";
    }

    // Ensure problem_type is an array
    let problemTypes = [];
    if (typeof problem_type === 'string') {
      problemTypes = [problem_type]; // Convert single value to an array
    } else if (Array.isArray(problem_type)) {
      problemTypes = problem_type;
    }

    // Check if problemTypes has values
    if (problemTypes.length === 0) {
      errors.problemType = "At least one problem type must be selected";
    }

    // Display errors if any exist
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Create new issue report
    const newIssueReport = new IssueReport({
      email,
      confirmEmail: confirm_email,
      comment,
      problemTypes, // Use problemTypes array
      status: 'unresolved', // Set default status
    });

    await newIssueReport.save();

    // Send JSON response for success
    res.status(200).json({ success: true, message: "Issue reported successfully. Thank you for your feedback." });
  } catch (error) {
    console.error("Error in reportIssue controller:", error); // Log the error for debugging
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


// Fetch all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await IssueReport.find();
    console.log("Fetched reports:", reports); // Log fetched reports to the console
    res.status(200).json({ success: true, reports: reports }); // Send JSON response with reports data
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  reportIssue,
  getAllReports,
};
