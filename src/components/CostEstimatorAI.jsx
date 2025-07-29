import React, { useState } from 'react';
import { Sparkles, DollarSign, Info } from 'lucide-react'; // Icons for the tool

const CostEstimatorAI = () => {
  const [serviceType, setServiceType] = useState('basic_website');
  const [projectDescription, setProjectDescription] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEstimate = async () => {
    setIsLoading(true);
    setError('');
    setEstimatedCost(null); // Clear previous estimate

    const prompt = `Generate a *simulated* cost estimate for a web development project based on the following details.
    
    Service Type: ${serviceType.replace(/_/g, ' ').toUpperCase()}
    Project Description/Key Features: ${projectDescription || 'No specific features provided.'}
    
    Please provide the output in JSON format, strictly adhering to the following schema. The estimatedCost and individual breakdown costs should be in a plausible range for a web development project (e.g., $5,000 - $50,000 for a complex app).
    
    JSON Schema:
    {
      "type": "OBJECT",
      "properties": {
        "estimatedCost": { "type": "STRING", "description": "The total estimated cost, e.g., '$15,000 - $25,000'" },
        "currency": { "type": "STRING", "description": "The currency symbol, e.g., '$'" },
        "breakdown": {
          "type": "ARRAY",
          "description": "An array of cost items and their estimated costs",
          "items": {
            "type": "OBJECT",
            "properties": {
              "item": { "type": "STRING", "description": "Description of the cost item, e.g., 'Frontend Development'" },
              "cost": { "type": "STRING", "description": "Estimated cost for this item, e.g., '$8,000 - $12,000'" }
            }
          }
        },
        "disclaimer": { "type": "STRING", "description": "A clear disclaimer that this is a simulated estimate, not a real quote." }
      },
      "propertyOrdering": ["estimatedCost", "currency", "breakdown", "disclaimer"]
    }
    `;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "estimatedCost": { "type": "STRING" },
            "currency": { "type": "STRING" },
            "breakdown": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "item": { "type": "STRING" },
                  "cost": { "type": "STRING" }
                }
              }
            },
            "disclaimer": { "type": "STRING" }
          },
          "propertyOrdering": ["estimatedCost", "currency", "breakdown", "disclaimer"]
        }
      }
    };

    const apiKey = ""; // Canvas will automatically provide the API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      // Enhanced logging for debugging
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const jsonText = result.candidates[0].content.parts[0].text;
        try {
          const parsedJson = JSON.parse(jsonText);
          setEstimatedCost(parsedJson);
        } catch (parseError) {
          setError("Failed to parse AI response. The AI might have returned invalid JSON.");
          console.error("JSON parse error:", parseError);
          console.error("Raw AI response (failed to parse):", jsonText);
        }
      } else {
        setError("Sorry, the AI couldn't generate an estimate. The response was empty or malformed.");
        console.error("Unexpected or empty AI response structure:", result);
      }
    } catch (apiError) {
      setError("An error occurred while fetching the estimate. Please check your network connection or API key.");
      console.error("Error calling Gemini API:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8 leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-500">
          Project Cost Estimator
        </span>
        <br />
        <span className="text-gray-400 text-2xl md:text-3xl font-semibold">
          Get a Simulated Estimate
        </span>
      </h2>

      <div className="bg-zinc-900 rounded-xl shadow-xl p-8 border border-zinc-700">
        <div className="mb-6">
          <label htmlFor="service-type" className="block text-gray-300 text-sm font-bold mb-2">
            Select Service Type:
          </label>
          <select
            id="service-type"
            className="shadow border rounded w-full py-2 px-3 bg-zinc-700 text-white leading-tight focus:outline-none focus:shadow-outline"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="basic_website">Basic Website (Landing Page, Blog)</option>
            <option value="e_commerce">E-commerce Platform</option>
            <option value="custom_web_app">Custom Web Application (SaaS, CRM)</option>
            <option value="mobile_app">Mobile Application (iOS/Android)</option>
            <option value="api_integration">API Integration Service</option>
            <option value="consulting">Consulting & Strategy</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="project-description" className="block text-gray-300 text-sm font-bold mb-2">
            Project Description / Key Features:
          </label>
          <textarea
            id="project-description"
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-zinc-700 text-white leading-tight focus:outline-none focus:shadow-outline mb-2 resize-y"
            rows="5"
            placeholder="e.g., 'A social media app with user profiles, photo uploads, and real-time chat. Needs admin panel and push notifications.'"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          ></textarea>
          <p className="text-zinc-500 text-xs italic">Be as detailed as possible for a better estimate.</p>
        </div>

        <button
          onClick={handleEstimate}
          disabled={isLoading || !projectDescription}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-500 text-zinc-950 font-semibold hover:from-zinc-700 hover:to-zinc-800 hover:text-amber-600 transition-all duration-300 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating Estimate...</span>
            </>
          ) : (
            <>
              <DollarSign className="w-5 h-5" />
              <span>Get Simulated Estimate ✨</span>
            </>
          )}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-900 rounded-lg text-red-200 text-sm flex items-center space-x-2">
            <Info className="w-5 h-5" />
            <span>Error: {error}</span>
          </div>
        )}

        {estimatedCost && (
          <div className="mt-8 p-6 bg-zinc-800 rounded-lg border border-zinc-700 text-gray-200">
            <h3 className="text-2xl font-bold text-amber-500 mb-4 flex items-center space-x-2">
              <DollarSign className="w-6 h-6" />
              <span>Estimated Cost: {estimatedCost.estimatedCost}</span>
            </h3>
            <p className="text-gray-300 mb-4">{estimatedCost.disclaimer}</p>

            {estimatedCost.breakdown && estimatedCost.breakdown.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xl font-semibold text-white mb-3">Breakdown:</h4>
                <ul className="list-disc list-inside space-y-2">
                  {estimatedCost.breakdown.map((item, index) => (
                    <li key={index} className="text-gray-300">
                      <span className="font-medium text-amber-400">{item.item}:</span> {item.cost}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CostEstimatorAI;