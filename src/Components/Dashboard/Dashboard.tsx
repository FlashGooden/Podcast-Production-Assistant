import React, { useState, useEffect } from 'react';

// --- MOCK TRANSCRIPT ---
// In a real app, this would be the output of a transcription service like Whisper.
// We provide it here so the app is fully functional without needing an audio file.
const MOCK_TRANSCRIPT = `
Interviewer: Welcome back to 'Future Forward'. Today, we're thrilled to have Dr. Aris Thorne, a leading researcher in decentralized AI. Dr. Thorne, thank you for joining us.

Dr. Thorne: It's a pleasure to be here.

Interviewer: So, let's dive right in. The term 'decentralized AI' is gaining traction. Can you break it down for our listeners? What does it mean for AI to be decentralized?

Dr. Thorne: Absolutely. At its core, decentralization in AI means moving away from a model where a single, massive AI is trained and controlled by one entity in a central server. Instead, we envision a network of smaller, specialized AI models that can collaborate. Think of it like a team of experts versus a single genius. Your phone's AI might handle scheduling, while your car's AI handles navigation, and they can communicate securely without sending all your personal data to a central cloud. This is a fundamental shift in architecture.

Interviewer: That brings up a key point: data privacy. How does decentralization help with that? It sounds like data is moving around more, not less.

Dr. Thorne: It's a common misconception. With decentralization, your personal data can stay on your device. The AI models operate locally. This is often called 'edge computing'. So, instead of sending your raw data to a server to be processed, the model processes it right where it is. When models need to collaborate, they can share insights or anonymized summaries, not the raw data itself. For example, a city's traffic system could learn from thousands of cars' AI without ever knowing who is driving or where they are specifically going. The privacy benefits are immense. You can find more on this at federatedlearning.dev.

Interviewer: Fascinating. But what about the power? Can a network of smaller models truly compete with a giant, centralized model like the ones we see today?

Dr. Thorne: That's the billion-dollar question. And the answer is yes, but differently. A massive model might be a jack-of-all-trades, but a master of none. Specialized, decentralized models can be experts in their specific domains. A model trained exclusively on medical imaging will outperform a general model. The key is 'composition' – the ability for these expert models to work together on complex tasks. We're developing a protocol, you could call it a 'Model Context Protocol', to allow them to share context and goals seamlessly. It’s about collaborative intelligence, not just raw computational power.

Interviewer: So, the future isn't one AI to rule them all?

Dr. Thorne: Precisely. The future is a symphony of AIs, each playing its part. It's more resilient, more private, and ultimately, more adaptable. The monoculture of centralized AI is brittle. A decentralized ecosystem is robust.

Interviewer: Dr. Aris Thorne, this has been incredibly insightful. Thank you for shedding light on the future of artificial intelligence.

Dr. Thorne: My pleasure. Thanks for having me.
`;


// --- UI Components ---
const Card = ({ children, className = '' }) => (
    <div className={`bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 ${className}`}>
        {children}
    </div>
);

const Button = ({ children, onClick, isLoading, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`w-full flex justify-center items-center px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
            isLoading || disabled
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/50'
        } ${className}`}
    >
        {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : (
            children
        )}
    </button>
);

const ResultCard = ({ title, children, icon }) => (
    <Card className="flex-1 min-w-[300px]">
        <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-3">{icon}</span>
            {title}
        </h3>
        <div className="text-gray-200 space-y-4">{children}</div>
    </Card>
);

// --- Main App Component ---
export default function App() {
    // --- State Management ---
    const [transcript, setTranscript] = useState('');
    const [showNotes, setShowNotes] = useState(null);
    const [clips, setClips] = useState(null);
    const [isLoading, setIsLoading] = useState({ notes: false, clips: false });
    const [error, setError] = useState(null);

    // --- MCP Server Simulation ---
    // In a real MCP setup, these tools would be defined on a server.
    // Here, we simulate them as async functions.
    const mcpServer = {
        // Tool 1: Generate Show Notes from a transcript
        generateShowNotes: async (transcriptText) => {
            console.log("MCP Server: Received request for 'generateShowNotes'");
            if (!transcriptText) throw new Error("Transcript is empty.");

            const prompt = `You are a professional podcast producer. Based on the following transcript, generate a set of show notes. The output should be a JSON object with three keys: "summary" (a concise one-paragraph summary), "keyTopics" (an array of 5-7 key topics discussed as strings), and "mentionedLinks" (an array of any URLs or resources mentioned as strings).

Transcript:
---
${transcriptText}
---
`;
            try {
                // This uses a special feature to ask for a structured JSON response
                const payload = {
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                     generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: "OBJECT",
                            properties: {
                                "summary": { "type": "STRING" },
                                "keyTopics": {
                                    "type": "ARRAY",
                                    "items": { "type": "STRING" }
                                },
                                 "mentionedLinks": {
                                    "type": "ARRAY",
                                    "items": { "type": "STRING" }
                                }
                            },
                        }
                    }
                };
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`API call failed with status: ${response.status}`);
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0) {
                    const jsonText = result.candidates[0].content.parts[0].text;
                    return JSON.parse(jsonText);
                } else {
                    console.error("API response was empty or malformed:", result);
                    throw new Error("Failed to generate show notes from the API.");
                }

            } catch (e) {
                console.error("Error in generateShowNotes:", e);
                throw e; // Re-throw to be caught by the UI
            }
        },

        // Tool 2: Find Interesting Clips from a transcript
        findInterestingClips: async (transcriptText) => {
            console.log("MCP Server: Received request for 'findInterestingClips'");
             if (!transcriptText) throw new Error("Transcript is empty.");

            const prompt = `You are a viral content strategist for a podcast. Your job is to find 3-4 short, powerful, and interesting segments from the provided podcast transcript that would make excellent social media video clips. For each clip, provide a catchy, viral-style title and the full quote.

Transcript:
---
${transcriptText}
---
`;
            try {
                // This uses a special feature to ask for a structured JSON response
                const payload = {
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    "title": { "type": "STRING", "description": "A short, catchy, viral-style title for the clip." },
                                    "quote": { "type": "STRING", "description": "The full text of the clip-worthy segment." }
                                }
                            }
                        }
                    }
                };
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`API call failed with status: ${response.status}`);
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0) {
                    const jsonText = result.candidates[0].content.parts[0].text;
                    return JSON.parse(jsonText);
                } else {
                     console.error("API response was empty or malformed:", result);
                    throw new Error("Failed to generate clips from the API.");
                }

            } catch (e) {
                console.error("Error in findInterestingClips:", e);
                throw e; // Re-throw to be caught by the UI
            }
        }
    };


    // --- Client-side Handlers ---
    // These functions simulate the MCP client calling the server tools.
    const handleGenerateShowNotes = async () => {
        setIsLoading(prev => ({ ...prev, notes: true }));
        setShowNotes(null);
        setError(null);
        try {
            const result = await mcpServer.generateShowNotes(transcript);
            setShowNotes(result);
        } catch (e) {
            setError("Could not generate show notes. Please check the console for details.");
        } finally {
            setIsLoading(prev => ({ ...prev, notes: false }));
        }
    };

    const handleFindClips = async () => {
        setIsLoading(prev => ({ ...prev, clips: true }));
        setClips(null);
        setError(null);
        try {
            const result = await mcpServer.findInterestingClips(transcript);
            setClips(result);
        } catch (e) {
            setError("Could not find clips. Please check the console for details.");
        } finally {
            setIsLoading(prev => ({ ...prev, clips: false }));
        }
    };

    const loadMockTranscript = () => {
        setTranscript(MOCK_TRANSCRIPT);
        setShowNotes(null);
        setClips(null);
        setError(null);
    };

    const isTranscriptEmpty = transcript.trim() === '';

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-8" style={{background: 'linear-gradient(135deg, #1e1b4b 0%, #111827 50%, #4c1d95 100%)'}}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                        Podcast Production Assistant
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        An MCP-powered app to automate your podcast workflow.
                    </p>
                </header>

                {/* Main Content */}
                <main className="space-y-8">
                    {/* Step 1: Transcript Input */}
                    <Card>
                        <h2 className="text-2xl font-bold mb-4">Step 1: Provide Transcript</h2>
                        <textarea
                            value={transcript}
                            onChange={(e) => setTranscript(e.target.value)}
                            placeholder="Paste your podcast transcript here..."
                            className="w-full h-64 p-4 bg-gray-900/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                        />
                        <div className="mt-4">
                             <Button onClick={loadMockTranscript} className="bg-gray-700 hover:bg-gray-600">
                                Or, Load a Demo Transcript
                            </Button>
                        </div>
                    </Card>

                    {/* Error Message */}
                     {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">
                            <strong>Error:</strong> {error}
                        </div>
                    )}


                    {/* Step 2: AI Tools */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <Card>
                            <h2 className="text-2xl font-bold mb-4">Step 2: Generate Assets</h2>
                            <p className="text-gray-300 mb-6">Use the AI-powered MCP tools to generate production assets from your transcript.</p>
                            <div className="space-y-4">
                                <Button onClick={handleGenerateShowNotes} isLoading={isLoading.notes} disabled={isTranscriptEmpty}>
                                    📝 Generate Show Notes
                                </Button>
                                <Button onClick={handleFindClips} isLoading={isLoading.clips} disabled={isTranscriptEmpty}>
                                    🎬 Find Social Media Clips
                                </Button>
                            </div>
                        </Card>
                         <Card>
                            <h2 className="text-2xl font-bold mb-4">What is Happening?</h2>
                             <div className="text-gray-300 space-y-2">
                                <p>This app simulates an **MCP Client** (this user interface) talking to an **MCP Server** (the code running the tools).</p>
                                <p>When you click a button:</p>
                                <ol className="list-decimal list-inside pl-4 space-y-1">
                                    <li>The client calls a specific tool on the server (e.g., `generateShowNotes`).</li>
                                    <li>The server constructs a detailed prompt for the AI.</li>
                                    <li>It securely calls the AI API and gets a structured JSON response.</li>
                                    <li>The response is sent back to the client to be displayed here.</li>
                                </ol>
                            </div>
                        </Card>
                    </div>

                    {/* Step 3: Results */}
                    {(showNotes || clips || isLoading.notes || isLoading.clips) && (
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-center">Step 3: Review Your Assets</h2>
                            <div className="flex flex-wrap md:flex-nowrap gap-8">
                                {/* Show Notes Result */}
                                {isLoading.notes && <ResultCard title="Show Notes" icon="📝"> <div className="text-center p-8">Generating...</div> </ResultCard>}
                                {showNotes && (
                                    <ResultCard title="Show Notes" icon="📝">
                                        <div>
                                            <h4 className="font-semibold text-lg mb-2 text-indigo-300">Summary</h4>
                                            <p>{showNotes.summary}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-2 text-indigo-300">Key Topics</h4>
                                            <ul className="list-disc list-inside space-y-1">
                                                {showNotes.keyTopics.map((topic, i) => <li key={i}>{topic}</li>)}
                                            </ul>
                                        </div>
                                        {showNotes.mentionedLinks && showNotes.mentionedLinks.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-lg mb-2 text-indigo-300">Mentioned Links</h4>
                                                <ul className="list-disc list-inside space-y-1">
                                                    {showNotes.mentionedLinks.map((link, i) => <li key={i}><a href={link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{link}</a></li>)}
                                                </ul>
                                            </div>
                                        )}
                                    </ResultCard>
                                )}

                                {/* Clips Result */}
                                {isLoading.clips && <ResultCard title="Potential Clips" icon="🎬"> <div className="text-center p-8">Searching for clips...</div> </ResultCard>}
                                {clips && (
                                    <ResultCard title="Potential Clips" icon="🎬">
                                        <div className="space-y-6">
                                            {clips.map((clip, i) => (
                                                <div key={i} className="p-4 bg-black/20 rounded-lg border border-white/10">
                                                    <h4 className="font-semibold text-lg mb-2 text-indigo-300">{clip.title}</h4>
                                                    <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-300">
                                                        "{clip.quote}"
                                                    </blockquote>
                                                </div>
                                            ))}
                                        </div>
                                    </ResultCard>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
