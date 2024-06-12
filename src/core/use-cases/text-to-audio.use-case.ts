export const textToAudioUseCase = async (prompt: string, voice: string) => {

    try {
        // http://localhost:3000/gpt/text-to-audio
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/text-to-audio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt, voice})
        });

        if (!resp.ok) throw new Error('No se pudo realizar la generación de audio')
        
        const audioFile = await resp.blob();
        const audioUrl = URL.createObjectURL(audioFile);

        return {
            ok: true,
            message: prompt,
            audioUrl: audioUrl,
        }
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo realizar la generación de audio'
        }
    }
}