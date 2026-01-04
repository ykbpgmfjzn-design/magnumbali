import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Check, CheckCheck, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "agent";
  time: string;
  status?: "sent" | "delivered" | "read";
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-concierge`;

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Добро пожаловать в Magnum Estate! 🌴 Я ваш AI-консьерж. Чем могу помочь? Расскажу о виллах, инвестициях или доходности.",
      sender: "agent",
      time: "сейчас",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamChat = async (userMessages: { role: string; content: string }[]) => {
    const response = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Ошибка соединения");
    }

    return response;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Prepare messages for API
      const apiMessages = messages
        .filter((m) => m.sender !== "agent" || m.id !== 1) // Exclude initial greeting
        .map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        }))
        .concat({ role: "user", content: inputValue });

      const response = await streamChat(apiMessages);
      
      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      let assistantMessageId = messages.length + 2;

      // Add empty assistant message
      setMessages((prev) => [
        ...prev.map((m) => m.id === userMessage.id ? { ...m, status: "read" as const } : m),
        {
          id: assistantMessageId,
          text: "",
          sender: "agent" as const,
          time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);

      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId ? { ...m, text: assistantContent } : m
                )
              );
            }
          } catch {
            // Put back incomplete JSON
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось получить ответ",
        variant: "destructive",
      });
      
      // Remove failed message
      setMessages((prev) => prev.filter((m) => m.id !== messages.length + 2));
    } finally {
      setIsLoading(false);
    }
  };

  const StatusIcon = ({ status }: { status?: string }) => {
    if (status === "read") return <CheckCheck className="w-3.5 h-3.5 text-primary" />;
    if (status === "delivered") return <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />;
    return <Check className="w-3.5 h-3.5 text-muted-foreground" />;
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 touch-manipulation ${
          isOpen ? "hidden" : "block"
        }`}
        style={{
          background: "linear-gradient(135deg, hsl(42 85% 55%) 0%, hsl(38 80% 45%) 100%)",
          boxShadow: "0 0 40px hsl(42 85% 55% / 0.5)",
        }}
      >
        <Sparkles className="w-6 h-6 text-primary-foreground absolute -top-1 -right-1 animate-pulse" />
        <Bot className="w-7 h-7 text-primary-foreground" />
        <span className="absolute -top-1 -left-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] sm:h-[550px] max-h-[600px] glass-card-gold flex flex-col overflow-hidden rounded-xl sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border/30 bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm sm:text-base font-serif font-bold text-foreground flex items-center gap-1 sm:gap-2">
                    AI Консьерж
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">Онлайн</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass flex items-center justify-center hover:bg-muted/50 transition-colors touch-manipulation flex-shrink-0"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 sm:px-4 py-2 sm:py-3 ${
                      message.sender === "user"
                        ? "chat-bubble-outgoing"
                        : "chat-bubble-incoming"
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                    <div className={`flex items-center gap-1.5 mt-1.5 sm:mt-2 ${
                      message.sender === "user" ? "justify-end" : ""
                    }`}>
                      <span className="text-[10px] sm:text-xs opacity-60">{message.time}</span>
                      {message.sender === "user" && <StatusIcon status={message.status} />}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && messages[messages.length - 1]?.sender === "user" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="chat-bubble-incoming px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-border/30 bg-gradient-to-r from-transparent to-primary/5">
              <div className="flex gap-2">
                <Input
                  placeholder="Напишите сообщение..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  className="flex-1 text-sm sm:text-base h-10 sm:h-12"
                  disabled={isLoading}
                />
                <Button
                  variant="glow"
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 sm:w-12 sm:h-12 touch-manipulation"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
              <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-2 sm:mt-3">
                Powered by AI · Magnum Estate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
