import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildSystemPrompt } from '@/lib/prompts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, config } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured on the server.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: {
        role: 'user',
        parts: [{ text: buildSystemPrompt(config) }],
      },
    });

    // Build conversation history for Gemini
    // Gemini requires the first message to be 'user', so we handle the history carefully
    let chatHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Ensure history starts with a user message - if it starts with model, prepend a user message
    if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
      chatHistory = [
        { role: 'user', parts: [{ text: 'Start the interview. Greet me and ask your first question.' }] },
        ...chatHistory,
      ];
    }

    const chat = model.startChat({
      history: chatHistory,
    });

    // Get the latest user message or start conversation
    const latestMessage = messages.length === 0 
      ? 'Start the interview. Greet me and ask your first question.'
      : messages[messages.length - 1].content;

    const result = await chat.sendMessage(latestMessage);
    const response = result.response;
    const text = response.text();

    // Try to parse as JSON
    let parsed;
    try {
      // Remove potential markdown code blocks
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleanText);
    } catch {
      // If parsing fails, return as plain text
      parsed = {
        evaluation: null,
        feedback: text,
        nextQuestion: '',
      };
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error('Interview API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process interview request';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
