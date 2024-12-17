document.getElementById('generateBtn').addEventListener('click', async function () {
    const prompt = document.getElementById('prompt').value.trim(); // Hämta användarens beskrivning
    const style = document.getElementById('style').value; // Hämta stilvalet
    const number = parseInt(document.getElementById('number').value, 10); // Hämta antal bilder

    // Kontrollera att beskrivning inte är tom
    if (!prompt) {
        alert('Vänligen skriv in en beskrivning av designen.');
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

        // Skicka förfrågan till API för att generera designen
        const response = await fetch('https://external.api.recraft.ai/v1/images/generations', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer snFLW81WFe5VcWQ00EOagR25vYIQnv3Doi6O82lxu3yz5pBHEL0nWxA1hTlCXqXN', // Ersätt med din API-nyckel
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                style: style, // T.ex. 'digital_illustration'
                number: number, // För flera bilder
            }),
        });

        // Logga svaret för att se om API:et svarar korrekt
        const data = await response.json();
        console.log(data);  // Logga data för att se API-svaret

        // Kontrollera om API:et skickade tillbaka bilder
        if (data.data && data.data.length > 0) {
            // Visa genererade bilder
            output.innerHTML = data.data
                .map((img) => `<img src="${img.url}" alt="Genererad Bild" style="max-width: 100%; margin: 10px 0;">`)
                .join('');
        } else {
            output.innerHTML = '<p>Inga bilder kunde genereras. Försök med en annan beskrivning.</p>';
        }
    } catch (error) {
        console.error('Fel vid generering av bilder:', error);
        alert('Ett fel uppstod vid generering. Kontrollera din anslutning eller API-nyckel och försök igen.');
    }
});
