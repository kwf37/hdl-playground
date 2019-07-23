
/**
 * Opens a websocket on the hdl-playground app
 */
function openSocket() {
    url = 'ws://localhost:8080/'
    
    var ws = new WebSocket(url);

    ws.onerror = function(event) {
        console.log('error')
    };

    ws.onopen = function(event) {
        console.log('opened websocket')
    };

    ws.onmessage = function(event) {
        console.log('received message')
    };
}