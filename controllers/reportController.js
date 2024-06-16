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

    // Ensure problem_type is an array
    let problemTypes = [];
    if (typeof problem_type === 'string') {
      problemTypes = [problem_type]; // Convert single value to an array
    } else if (Array.isArray(problem_type)) {
      problemTypes = problem_type;
    }

    // Check if problemTypes has values
    if (problemTypes.length === 0) {
      return res.status(400).send("At least one problem type must be selected");
    }

    // Create new issue report
    const newIssueReport = new IssueReport({
      email,
      confirmEmail: confirm_email,
      comment,
      problemTypes, // Use problemTypes array
    });

    await newIssueReport.save();

    // Redirect to a page informing the user that the report was successful
    res.status(200).send("Issue reported successfully. Thank you for your feedback.");
  } catch (error) {
    console.error("Error in reportIssue controller:", error); // Log the error for debugging
    res.status(500).send("Internal Server Error");
  }
};

//new partttttttttttttttttttt
const getAllReports = async (req, res) => {
  try {
    const reports = await IssueReport.find();
    res.render('AdminPart/Report', { reports }); // Ensure correct path and data passing
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  reportIssue,
  getAllReports,
};
//new partttttttttttttttttttt