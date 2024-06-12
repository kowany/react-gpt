import { useState } from "react"
import { GptMessages, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { prosConsUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  
  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, {text: text, isGpt: false}])

    // TODO: useCase
    const {ok, content} = await prosConsUseCase(text)
    // console.log('ok:', ok)
    // console.log('content:', content)
    setIsLoading(false)
    if (!ok) return;
    setMessages((prev) => [...prev, {text: content, isGpt: true,}])

  } 

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Puedes escribir lo que sea que desees que compare y te de mis puntos de vista" />
        
          {
            messages.map((message, index) => (
              // console.log(message)
              message.isGpt
              ? (
                <GptMessages 
                  key={index}
                  text= {message.text}
                />
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

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections      
      />
    </div>
  )
}