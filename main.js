function move(link) {
    const a = document.createElement('a')
    a.href = 'https://' + link
    document.body.appendChild(a)
    a.click()
    a.remove()
}

async function submit() {
    const author = 'Author: ' + document.getElementById('author').value;
    const file = document.getElementById('file').files[0];
    const fd = new FormData();
    fd.append('file1', file);
    fd.append('payload_json', JSON.stringify({
        embeds: [{ title: 'submission', description: author }]
    }));
    try {
        const response = await fetch('https://discord.com/api/webhooks/1269222153480568832/VMEIiZAHXLZ5akObI57hTd2Rr7whlUy6_qj1RJtVF9nbx6BAlLEfChFKg7m03N5yunXW', {
            method: 'POST',
            body: fd
        });
        
        if (!response.ok) {
            throw new Error(`err: ${response.status}`);
        }
    
    } catch (error) {
        console.error('err:', error);
    }
}