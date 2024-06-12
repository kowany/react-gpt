
export const prosConsStreamUseCase = async (prompt: string) => {

    try {
        // http://localhost:3000/gpt/pros-cons-discusser-stream
        
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt}),
            // TODO: abortSignal
        });

        if (!resp.ok) throw new Error('No se pudo realizar la comparación')
        
        const reader = resp.body?.getReader();
        if (!reader) {
            console.log('No se pudo generar el reader');
            return null;
        }
        return reader;
        // const decoder = new TextDecoder();

        // let text = '';
        // const flag = true;
        // while (flag) {
        //     const { value, done } = await reader.read();
        //     if (done) break;
        //     const decodedChunk = decoder.decode( value, {stream: true});
        //     text = decodedChunk;
        //     console.log(text);
        // }
    } catch (error) {
        console.error(error)
        return null
    }
}