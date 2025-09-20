'use client';

import { useChat } from '@ai-sdk/react';
import { Conversation, ConversationContent } from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { DefaultChatTransport } from 'ai';

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <Conversation>
      <ConversationContent>
        {messages.map(message => (
          <Message key={message.id} from={message.role}>
            <MessageContent>
              <Response>
                {message.parts.map(part => (part.type === 'text' ? part.text : '')).join('')}
              </Response>
            </MessageContent>
          </Message>
        ))}
      </ConversationContent>

      <PromptInput
        onSubmit={message => {
          if (!message.text) {
            throw new Error('Message is empty');
          }
          sendMessage({ text: message.text });
        }}
      >
        <PromptInputBody>
          <PromptInputTextarea placeholder="メッセージを入力..." />
          <PromptInputToolbar>
            <div />
            <PromptInputSubmit status={status === 'streaming' ? 'streaming' : undefined} />
          </PromptInputToolbar>
        </PromptInputBody>
      </PromptInput>
    </Conversation>
  );
}
