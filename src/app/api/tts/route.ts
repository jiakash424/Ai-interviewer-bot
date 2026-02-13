import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    const apiKey = process.env.RESEMBLE_API_KEY;
    const voiceId = process.env.RESEMBLE_VOICE_ID || 'fb2d2858'; // Lucy (en-US)

    if (!apiKey) {
      return NextResponse.json(
        { error: 'RESEMBLE_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required.' },
        { status: 400 }
      );
    }

    const response = await fetch(
      'https://f.cluster.resemble.ai/stream',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voice_uuid: voiceId,
          data: text.slice(0, 5000),
          sample_rate: 44100,
          output_format: 'mp3',
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Resemble AI error:', errText);
      return NextResponse.json(
        { error: `Resemble AI error: ${response.status}` },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: unknown) {
    console.error('TTS error:', error);
    const message = error instanceof Error ? error.message : 'TTS failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
