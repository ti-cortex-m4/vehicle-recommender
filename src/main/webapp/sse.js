    if (!!window.EventSource) {
        var eventSource = new EventSource("/sse/infinite");

        var elements = document.getElementById("messages");

        function add(message) {
            var element = document.createElement("li");
            element.innerHTML = message;
            elements.appendChild(element);
        }

        eventSource.onmessage = function (e) {
            var message = JSON.parse(e.data);
            add(message.text);
        };

        eventSource.onopen = function (e) {
            add('connection was opened');
        };

        eventSource.onerror = function (e) {
            if (e.readyState == EventSource.CONNECTING) {
                add('event: CONNECTING');
            } else if (e.readyState == EventSource.OPEN) {
                add('event: OPEN');
            } else if (e.readyState == EventSource.CLOSING) {
                add('event: CLOSING');
            } else if (e.readyState == EventSource.CLOSED) {
                add('event: CLOSED');
            }
        };
    } else {
        alert('The browser does not support Server-Sent Events');
    }
