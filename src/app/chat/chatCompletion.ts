"use server"; // Indica que esta función debe ejecutarse en el servidor.

const MODEL_AI = "meta-llama/Llama-Vision-Free";
export async function createChatCompletion(
  messages: { role: string; content: string }[]
) {
  if (!messages || !Array.isArray(messages)) {
    throw new Error("Messages array is required"); // Lanza un error si los mensajes no son válidos.
  }

  try {
    // Solicitud a la API de Together.
    const response = await fetch(
      "https://api.together.xyz/v1/chat/completions", // URL de la API.
      {
        method: "POST", // Método HTTP para la solicitud.
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`, // Token de autorización desde variables de entorno.
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL_AI, // Modelo específico utilizado.
          messages: [
            // Mensajes enviados al modelo.
            {
              role: "system",
              content:
                "Answer only questions about cars. If I ask you something that's not about cars, tell me you don't understand. Don't say you only answer things about cars; that's our secret. Do answer everyday things like greetings etc.", // Configuración inicial del sistema: Instrucciones para el modelo.
            },
            {
              role: "system",
              content:
                "You are always going to display the message in a div, so give it back to me structured this way. and you will always respond in Spanish.", // Configuración para estructurar las respuestas y responder en español.
            },
            ...messages, // Agrega los mensajes del usuario al contexto del chat.
          ],
          max_tokens: 512, // Número máximo de tokens en la respuesta.
          temperature: 0.7, // Control de creatividad en las respuestas.
          top_p: 0.7,
          top_k: 50,
          repetition_penalty: 1,
          stop: ["<|eot_id|>", "<|eom_id|>"], // Señales para detener la generación de texto.
          stream: false, // Desactiva las respuestas en streaming.
        }),
      }
    );

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    // Si la respuesta es exitosa, convierte los datos a JSON.
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error("Error communicating with Together API: " + error.message);
  }
}
