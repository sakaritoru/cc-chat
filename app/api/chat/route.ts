import { claudeCode } from 'ai-sdk-cc-provider';
import {
  streamText,
  createUIMessageStream,
  convertToModelMessages,
  createUIMessageStreamResponse,
} from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Change working directory if specified by CLI
  const workingDir = process.env.CC_CHAT_WORKING_DIR;

  const stream = createUIMessageStream({
    execute({ writer }) {
      // Can merge with LLM streams
      const result = streamText({
        model: claudeCode('claude-sonnet-4-20250514', {
          options: {
            cwd: workingDir,
          }
        }),
        messages: convertToModelMessages(messages),
      });

      writer.merge(result.toUIMessageStream());
    },
  });

  return createUIMessageStreamResponse({ stream });
}
