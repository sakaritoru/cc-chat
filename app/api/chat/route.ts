import { claudeCode } from 'ai-sdk-cc-provider';
import {
  streamText,
  createUIMessageStream,
  convertToModelMessages,
  createUIMessageStreamResponse,
} from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = createUIMessageStream({
    execute({ writer }) {
      // Can merge with LLM streams
      const result = streamText({
        model: claudeCode('claude-3-5-sonnet-20241022'),
        messages: convertToModelMessages(messages),
      });

      writer.merge(result.toUIMessageStream());
    },
  });

  return createUIMessageStreamResponse({ stream });
}
