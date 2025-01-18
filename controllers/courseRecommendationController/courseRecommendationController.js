const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Course = require('../../models/courseModel/courseModel');

// Path to store log file
const logFilePath = path.join(__dirname, '../request_log.txt');

const logRequest = () => {
  const logMessage = `Request received at: ${new Date().toISOString()}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error logging request:", err);
    }
  });
};


// Course Recommendation Controller
const courseRecommendationController = async (req, res) => {
  try {
    logRequest();

    const { interests } = req.body;
    console.log(interests);

    // Fetch all approved courses
    const courses = await Course.find({ isApprove: true });

    // // Prepare the prompt for GPT-3.5
    // const prompt = `
    //   Based on the following skills, interests, and career goals, please recommend the best courses from the provided list. The user is interested in courses that align with the following topics and technologies:

    //     - Interests and Skills: ${interests || "N/A"}
    //     - Course List: ${JSON.stringify(courses)}

    //     Please provide a detailed list of course recommendations that are most relevant to the user's interests and skills. For each recommended course, include the following details:

    //     - CourseName
    //     - Category (e.g., Web Development, Mobile App Development, etc.)
    //     - Relevant Topics or Skills Covered
    //     - Price (if available)
    //     - Duration
    //     - Instructor (if available)
    //     - Image Link

    //     Make sure the recommendations focus on courses that help the user develop or improve the skills mentioned in their interests, such as software engineering, full-stack development, mobile app development (e.g., Flutter, React Native), or any related technology.
    // `;

    // // Send the prompt to the OpenAI API
    // const response = await axios.post(
    //   "https://api.openai.com/v1/chat/completions",
    //   {
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: prompt }],
    //     max_tokens: 250,
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //     },
    //   }
    // );

    // // Process and format the course recommendations
    // const recommendations = response.data.choices[0].message.content;

    // // Example: Parsing the formatted course recommendations
    // const formattedRecommendations = recommendations.split("\n\n").map((course, index) => {
    //   const lines = course.split("\n");

    //     return lines
    // });

    // Send the formatted response back to the client
    res.status(200).send({
      success: true,
      message: "Courses fetched successfully",
      data: courses
    });

  } catch (error) {
    // Handle any errors and send response
    console.error("Error:", error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};



module.exports = { courseRecommendationController };
