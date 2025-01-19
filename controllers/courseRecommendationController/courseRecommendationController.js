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

    // Prepare the prompt for GPT-3.5 to return JSON only
    const prompt = `
      Based on the following skills, interests, and career goals, recommend the best courses from the provided list. 
      The user is interested in courses that align with the following topics and technologies:

      - Interests and Skills: ${interests || "N/A"}
      - Course List: ${JSON.stringify(courses)}

      Respond strictly in valid JSON format with an array of recommended courses, following this structure:

      {
        "recommendations": [
          {
            "courseName": "Course Name",
            "category": "Web Development",
            "relevantTopics": ["Topic1", "Topic2"],
            "price": "Free/Paid - $XXX",
            "duration": "XX weeks/hours",
            "instructor": "Instructor Name",
            "imageLink": "https://example.com/image.jpg"
          }
        ]
      }

      Do not include explanations, comments, or additional text—only return valid JSON.
    `;

    // Send the prompt to OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract and parse the JSON response
    const recommendations = JSON.parse(response.data.choices[0].message.content);

    // Send only JSON data
    res.status(200).json(recommendations);

  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};




module.exports = { courseRecommendationController };
