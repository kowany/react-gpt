import { useState } from "react"
import { GptMessages, GptOrthographyMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { orthographyUseCase } from "../../../core/use-cases";
8
interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}

export const OrthographyPage = () => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  
  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, {text: text, isGpt: false}])
    
    const {ok, message, errors, userScore} = await orthographyUseCase(text)
    if (!ok) {
      setMessages((prev) => [...prev, {text: message, isGpt: true}])
    } else {
      setMessages((prev) => [...prev, {
        text: 'No se pudo realizar la corrección',
        isGpt: true,
        info: {errors, message, userScore}
      }])

    }
    // console.log(data);
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
                <GptOrthographyMessage 
                  key={index}
                  {...message.info!}
                  // errors={message.info!.errors}
                  // message={message.info!.message}
                  // userScore={message.info!.userScore}
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
      {/* <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
      /> */}
      {/* <TextMessageBoxSelect 
        onSendMessage={() => console.log}
        placeholder=""
        options={[{id: '1', text: 'hola'}, {id:'2', text: 'mundo' }]}
      /> */}
    </div>
)}
