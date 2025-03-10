const axios = require('axios');

exports.callGeminiAPI = async (text, modificationType) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

    const modificationInstructions = {
        shorten: "Make the following text concise while preserving its meaning in a single sentence.",
        lengthen: "Expand the following text slightly, adding detail but keeping it under 20 words.",
        formal: "Rewrite the following text in a formal tone but keep it under 15 words.",
        casual: "Rewrite the following text in a casual tone, making it brief and friendly."
    };

    if (!modificationInstructions[modificationType]) {
        return { error: "Invalid modification type. Choose from 'shorten', 'lengthen', 'formal', or 'casual'." };
    }

    try {
        const requestBody = {
            contents: [
                {
                    parts: [{ text: `${modificationInstructions[modificationType]}\n\n${text}` }]
                }
            ]
        };

        const response = await axios.post(url, requestBody, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("Raw API Response:", JSON.stringify(response.data, null, 2));

        const candidates = response.data?.candidates;
        if (!candidates || candidates.length === 0) {
            throw new Error("No candidates returned from API");
        }

        const contentParts = candidates[0]?.content?.parts;
        if (!contentParts || contentParts.length === 0) {
            throw new Error("No content parts found in API response");
        }

        let modifiedText = contentParts[0]?.text?.trim() || "No response received";

        return {
            originalText: text,
            modifiedText: modifiedText,
            changes: modificationInstructions[modificationType]
        };
    } catch (error) {
        console.error("Gemini API error:", error.response?.data || error.message);
        return { error: error.response?.data?.error?.message || "Failed to communicate with Gemini API" };
    }
};
