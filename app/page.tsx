'use client';

import { useChat } from '@ai-sdk/react';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageAvatar
} from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';
import { Actions, Action } from '@/components/ai-elements/actions';
import { Loader } from '@/components/ai-elements/loader';
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { DefaultChatTransport } from 'ai';
import { Copy, MessageSquare } from 'lucide-react';

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-lg font-semibold text-[rgb(217,119,87)]">CC Chat</h1>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="新しい会話を始めましょう"
              description="下のメッセージボックスから何でも聞いてください"
              icon={<MessageSquare className="h-12 w-12 text-muted-foreground" />}
            />
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => {
                const messageText = message.parts.map(part => (part.type === 'text' ? part.text : '')).join('');
                const isLastAssistantMessage = message.role === 'assistant' && index === messages.length - 1;
                const showLoading = status === 'streaming' && isLastAssistantMessage && !messageText.trim();

                return (
                  <Message key={message.id} from={message.role}>
                    <div className={`flex-1 space-y-2 ${message.role === 'user' ? 'flex flex-col items-end' : ''}`}>
                      <MessageContent variant="contained">
                        {showLoading ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader />
                            <span>AIが返答を考えています...</span>
                          </div>
                        ) : (
                          <Response>
                            {messageText}
                          </Response>
                        )}
                      </MessageContent>

                      {/* Actions for assistant messages */}
                      {message.role === 'assistant' && !showLoading && messageText.trim() && (
                        <Actions className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Action
                            tooltip="Copy message"
                            onClick={() => navigator.clipboard.writeText(messageText)}
                          >
                            <Copy className="h-4 w-4" />
                          </Action>
                        </Actions>
                      )}
                    </div>

                    <MessageAvatar
                      src="/api/placeholder/32/32"
                      name={message.role === 'assistant' ? 'AI' : 'You'}
                      className={message.role === 'assistant' ? '!bg-[rgb(217,119,87)]' : 'bg-secondary'}
                    />
                  </Message>
                );
              })}

            </div>
          )}
        </ConversationContent>
      </Conversation>

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        <PromptInput
          className="mx-auto max-w-4xl"
          onSubmit={message => {
            if (!message.text) {
              throw new Error('Message is empty');
            }
            sendMessage({ text: message.text });
          }}
        >
          <PromptInputBody>
            <PromptInputTextarea placeholder="メッセージを入力... (Shift+Enterで改行)" />
            <PromptInputToolbar>
              <div className="text-xs text-muted-foreground">
                {status === 'streaming' ? '返答中...' : ''}
              </div>
              <PromptInputSubmit status={status === 'streaming' ? 'streaming' : undefined} />
            </PromptInputToolbar>
          </PromptInputBody>
        </PromptInput>
      </div>
    </div>
  );
}
