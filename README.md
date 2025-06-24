# Podcast Production Assistant

A Next.js application that leverages the Model Context Protocol (MCP) to automate podcast production workflows. This tool helps podcast creators generate show notes and identify viral social media clips from their transcripts using AI.

## Features

### 🎙️ AI-Powered Show Notes Generation
- Automatically generates comprehensive show notes from podcast transcripts
- Extracts key topics and discussion points
- Identifies and links any resources or URLs mentioned during the episode
- Creates professional summaries suitable for podcast platforms

### 🎬 Viral Clip Discovery
- Analyzes transcripts to find engaging, shareable content
- Generates catchy, viral-style titles for social media clips
- Identifies powerful quotes and soundbites perfect for short-form content
- Helps maximize content reach across social platforms

### 🔧 MCP Protocol Integration
- Built on the Model Context Protocol for secure AI interactions
- Simulates MCP client-server architecture
- Demonstrates how MCP can be used for content production workflows
- Structured JSON responses for reliable data processing

## How It Works

1. **Transcript Input**: Paste your podcast transcript or load the demo transcript
2. **AI Processing**: The MCP server constructs detailed prompts and calls AI APIs
3. **Asset Generation**: Receive structured show notes and clip suggestions
4. **Review & Export**: Review generated content and use it for your production workflow

## Technology Stack

- **Frontend**: Next.js 15 with React 19
- **AI Integration**: Google Gemini 2.0 Flash API
- **Protocol**: Model Context Protocol (MCP) simulation
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd podcast-production-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Set up your AI API key:
   - Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add it to the `apiKey` variable in `src/Components/Dashboard/Dashboard.tsx`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Load Transcript**: Either paste your own transcript or click "Load a Demo Transcript" to see the app in action
2. **Generate Assets**: Click either "Generate Show Notes" or "Find Social Media Clips"
3. **Review Results**: Examine the AI-generated content in the structured format
4. **Export**: Copy the generated content for use in your podcast production workflow

## MCP Architecture

This application demonstrates MCP (Model Context Protocol) concepts:

- **MCP Client**: The React frontend that users interact with
- **MCP Server**: Simulated server that handles AI tool requests
- **Tools**: Two main tools (`generateShowNotes` and `findInterestingClips`)
- **Structured Responses**: JSON schema validation for reliable data exchange

## Development

### Project Structure

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
