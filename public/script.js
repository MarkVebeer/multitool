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

document.getElementById('ytmp3Btn').addEventListener('click', async () => {
    const ytUrlInput = document.getElementById('ytUrlInput').value;
    const result = document.getElementById('ytResult');

    if (!ytUrlInput) {
        result.textContent = 'Please enter a YouTube URL';
        return;
    }

    // Először nyitunk meg egy üres ablakot
    const downloadWindow = window.open('', '_blank');

    try {
        const response = await fetch('/ytmp3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl: ytUrlInput })
        });

        if (response.ok) {
            const data = await response.json();
            const downloadUrl = data.downloadUrl;
            result.textContent = `Download ready: ${downloadUrl}`;
            
            // Ha a válasz rendben van, frissítjük az új ablak URL-jét a valódi letöltési linkre
            downloadWindow.location = downloadUrl;
        } else {
            result.textContent = 'Error processing the request';
            // Ha hiba történik, bezárhatjuk az üres ablakot
            downloadWindow.close();
        }
    } catch (err) {
        console.error('Error:', err);
        result.textContent = 'Error processing the request';
        downloadWindow.close(); // Ha hiba van, zárjuk be az üres ablakot
    }
});
