// static/script.js
async function sendG4FRequest() {
    const userPrompt = document.getElementById('userPrompt').value;
    
    const response = await fetch('/api/g4f_query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userPrompt })
    });
    
    const data = await response.json();
    console.log(data);
    document.getElementById('response').textContent = data.response;
}
