var http = require('http');
var players = [];

http.createServer(function(req, res) {
    var url = require('url').parse(req.url, true);
    if (url.pathname == '/get') {
        res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify(players));
    }
    else if (url.pathname == '/join') {
        var playerNumber = players.length;
        players[playerNumber] = {x: 0, y: 0, z: 0};
        res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
        res.end(playerNumber.toString());
    }
    else if (url.pathname == '/leave') {
        delete players[parseInt(url.query.player)];
        res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
        res.end('ok');
    }
    else if (url.pathname == '/set') {
        players[url.query.player].x = parseInt(url.query.x);
        players[url.query.player].y = parseInt(url.query.y);
        players[url.query.player].z = parseInt(url.query.z);
        res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
        res.end('ok');
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
        res.end('404 not found');
    }
}).listen(8080);