// static/script.js
async function sendG4FRequest(input) {
    const response = await fetch('/api/g4f_query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input })
    });
    
    const data = await response.json();
    console.log(data);
    document.getElementById('response').textContent = data.response;
}
