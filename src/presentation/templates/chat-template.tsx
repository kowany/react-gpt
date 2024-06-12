import { useState } from "react"
import { GptMessages, MyMessage, TypingLoader, TextMessagesBox } from "../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  
  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, {text: text, isGpt: false}])

    // TODO: useCase
    
    setIsLoading(false)

    // TODO: Añadir el mensaje de isGpt en true
  } 

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Hola, puedes escribir tu texto en español y te ayudo con las correcciones" />
        
          {
            messages.map((message, index) => (
              // console.log(message)
              message.isGpt
              ? (
                <GptMessages key={index} text="Esto es de OpenAI" />
              )
              : (
                <MyMessage key={index} text={message.text} />
              )
            ))
          }

          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader className="fade-in" />
              </div>
            )

          }

        </div>
      </div>

      <TextMessagesBox
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections      
      />
    </div>
  )
}