    document.getElementById('generateBtn').addEventListener('click', async function () {
            const prompt = document.getElementById('prompt').value.trim();
            const number = parseInt(document.getElementById('number').value, 10);

            // Kontrollera om beskrivningen inte är tom
            if (!prompt) {
                alert('Vänligen skriv in en beskrivning.');
                return;
            }
            
            if (isNaN(number) || number < 1 || number > 5) {
                alert('Antalet bilder måste vara mellan 1 och 5.');
                return;
            }

            try {
                // Visa laddningsmeddelande
                const output = document.getElementById('output');
                output.innerHTML = '<p>Genererar bilder, vänligen vänta...</p>';

                // Skicka API-anrop till OpenAI
                const response = await fetch('https://api.openai.com/v1/images/generations', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer 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', // Ersätt med din egen API-nyckel
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'dall-e-3',
                        prompt: prompt,
                        n: number,
                        size: '1024x1024'
                    }),
                });

                const data = await response.json();

                // Kontrollera om API:et returnerade bilder
                if (data.data && data.data.length > 0) {
                    // Visa de genererade bilderna
                    output.innerHTML = data.data
                        .map((img) => `<img src="${img.url}" alt="Genererad bild">`)
                        .join('');
                } else {
                    output.innerHTML = '<p>Inga bilder kunde genereras. Försök med en annan beskrivning.</p>';
                }
            } catch (error) {
                console.error('Fel vid generering av bilder:', error);
                alert('Ett fel uppstod vid generering. Kontrollera din anslutning eller API-nyckel och försök igen.');
            }
        });
