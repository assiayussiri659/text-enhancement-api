# Text Enhancement API

This API enhances text using the Gemini service. It allows you to transform text in the following ways:

- Make the text more concise while keeping the meaning
- Expand the text by adding more detail while keeping the meaning
- Rewrite the text in a formal tone
- Rewrite the text in a casual and conversational tone

## Files

- `.env`: Environment variables
- `app.js`: Main application file
- `package-lock.json`: Dependency lock file
- `package.json`: Project dependencies and scripts
- `controllers/textController.js`: Controller for handling text enhancement requests
- `routes/textRoutes.js`: Defines the API routes
- `services/geminiService.js`: Service for interacting with the Gemini API

## Usage

1. Install dependencies: `npm install`
2. Set up environment variables in `.env` (e.g., Gemini API key)
3. Run the application: `npm start`

## API Endpoints

- `POST /enhance`: Enhances the provided text using the Gemini service. The API calls the Gemini service with a prompt that includes the provided text and instructions to either make the text more concise, expand the text, rewrite it in a formal tone, or rewrite it in a casual and conversational tone.

## Text Transformations

The API uses the Gemini service to perform the following text transformations:

- **Conciseness:** Makes the text more concise while preserving the original meaning.
- **Expansion:** Expands the text by adding more detail while maintaining the original meaning.
- **Formal Tone:** Rewrites the text in a formal and professional tone.
- **Casual Tone:** Rewrites the text in a casual and conversational tone.

## Example Response

```json
{
    "originalText": "I need assistance with this issue.",
    "modifiedText": "I require immediate assistance resolving this specific problem.",
    "changes": "Expanded the text by adding more details while keeping the meaning."
}
##   t e x t - e n h a n c e m e n t - a p i  
 