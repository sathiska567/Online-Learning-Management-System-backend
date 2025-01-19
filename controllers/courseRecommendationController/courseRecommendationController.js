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
    // Ensure logging function exists or remove it
    if (typeof logRequest === "function") {
      logRequest();
    }

    const { interests } = req.body;
    console.log("User Interests:", interests);

    // Fetch approved courses from the database
    const courses = await Course.find({ isApprove: true });

    if (!courses.length) {
      return res.status(404).json({ success: false, message: "No courses found" });
    }

    // Prepare the prompt for GPT-3.5
    const prompt = `
  Based on the following skills, interests, and career goals, recommend the best courses from the provided list. 
  The user is interested in courses that align with the following topics and technologies:

  - Interests and Skills: ${interests || "N/A"}
  - Course List: ${JSON.stringify(courses)}

  Respond strictly in valid JSON format with an array of recommended courses, following this structure:

  {
    "recommendations": [
      {
        "title": "Course Title",
        "description": "Brief course description",
        "imgLink": "https://example.com/image.jpg",
        "category": "Category Name",
        "price": 100,
        "enrolledStudents": ["userId1", "userId2"],
        "reviews": [
          {
            "userId": "userId123",
            "reviewText": "Great course!",
            "rating": 5
          }
        ],
        "overallRatings": 4.5,
        "instructor": "Instructor Name",
        "duration": "6 weeks",
        "isDeleted": false,
        "isApprove": true,
        "progress": 75,
        "createdAt": "2024-01-01T12:00:00Z",
        "updatedAt": "2024-01-05T12:00:00Z"
      }
    ]
  }

  Strictly return only valid JSON without any additional text or explanations.
`;


    // Send the prompt to OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract and parse the JSON response
    let recommendations;
    try {
      recommendations = JSON.parse(response.data.choices[0].message.content);
    } catch (jsonError) {
      console.error("JSON Parsing Error:", jsonError);
      return res.status(500).json({ success: false, message: "Invalid AI response format" });
    }

    // Validate if recommendations contain expected structure
    if (!recommendations || !recommendations.recommendations) {
      return res.status(500).json({ success: false, message: "Unexpected AI response format" });
    }

    res.status(200).json(recommendations);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "An error occurred", error: error.message });
  }
};



module.exports = { courseRecommendationController };
