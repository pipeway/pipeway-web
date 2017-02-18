var sock = new SockJS('http://10.99.97.113:3000/wstunnel');
sock.onopen = function() {
    sock.send(JSON.stringify({'type': 'alias', body: {
        name: '13522338363_1_15527928085',
        channel: '5168d020-44e2-11e6-966d-4742979426d8'
    }}));
};
sock.onmessage = function(e) {
    console.log(e.data);
};
sock.onclose = function() {
    console.log('close');
};
