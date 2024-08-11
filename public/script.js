document.getElementById('shortenBtn').addEventListener('click', async () => {
    const urlInput = document.getElementById('urlInput').value;
    const result = document.getElementById('urlResult'); // Updated ID

    if (!urlInput) {
        result.textContent = 'Please enter a URL';
        return;
    }

    const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ originalUrl: urlInput })
    });

    if (response.ok) {
        const data = await response.json();
        result.textContent = `Short URL: ${data.shortUrl} copied to clipboard!`;
        navigator.clipboard.writeText(data.shortUrl);
    } else {
        result.textContent = 'Error creating short URL';
    }
});
