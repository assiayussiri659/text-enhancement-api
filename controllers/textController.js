const { callGeminiAPI } = require('../services/geminiService');

exports.enhanceText = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text input is required" });
        }

        const response = await callGeminiAPI(text, "lengthen");

        return res.json({
            originalText: text,
            modifiedText: response.modifiedText,
            changes: "Expanded the text by adding more details while keeping the meaning."
        });
    } catch (error) {
        console.error("Error in enhanceText:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};


exports.modifyText = async (req, res) => {
    try {
        const { text, modification } = req.body;
        if (!text || !modification) {
            return res.status(400).json({ error: "Text and modification type are required" });
        }

        const validModifications = ["shorten", "lengthen", "formal", "casual"];
        if (!validModifications.includes(modification)) {
            return res.status(400).json({ error: "Invalid modification type. Choose from 'shorten', 'lengthen', 'formal', or 'casual'." });
        }

        const response = await callGeminiAPI(text, modification);

        return res.json({
            originalText: text,
            modifiedText: response.modifiedText,
            changes: response.changes
        });
    } catch (error) {
        console.error("Error in modifyText:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};
