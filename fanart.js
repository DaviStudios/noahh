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

function load() {
    fetch("https://api.github.com/repos/DaviStudios/noahh/git/trees/main?recursive=1")
        .then(res => res.json())
        .then(res => {
            res.tree.filter(f => f.path.startsWith("fanart/")).map(f => f.path).forEach(file => {
                let cnt = document.createElement('div');
                cnt.style.position = 'relative';
                cnt.style.display = 'inline-block';
                cnt.style.margin = '10px';
                
                let img = document.createElement('img');
                img.src = 'https://github.com/DaviStudios/noahh/blob/main/' + file + '?raw=true';
                img.width = 150;
                img.height = 150;

                fetch('https://raw.githubusercontent.com/DaviStudios/noahh/main/authors/' + file.replace('fanart/', '') + '.txt')
                    .then(response => response.text())
                    .then(text => {
                        let ol = document.createElement('div');
                        ol.style.position = 'absolute';
                        ol.style.bottom = '0';
                        ol.style.left = '0';
                        ol.style.width = '100%';
                        ol.style.textShadow = '2px 2px #000000';
                        ol.style.color = 'white';
                        ol.style.textAlign = 'left';
                        ol.style.padding = '5px';
                        ol.style.boxSizing = 'border-box';
                        ol.innerText = text;

                        cnt.appendChild(img);
                        cnt.appendChild(ol);
                        document.body.appendChild(cnt);
                    });
            });
        });
}

load()  