document.getElementById('generate-button').addEventListener('click', async function() {
  const description = document.getElementById('description').value;
  const imageStyle = document.getElementById('image-style').value;

  const response = await fetch('/api/generate', { 
      method: 'POST',
      body: JSON.stringify({ description, imageStyle }),
      headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json();
  document.getElementById('result').src = data.image_url;
});
