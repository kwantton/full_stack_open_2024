# Exercise 0.4: New note diagram
- The part starting from GET ...exampleapp/notes is adapted from the course material (to get the full picture better)
- source: https://fullstackopen.com/en/part0/fundamentals_of_web_apps#loading-a-page-containing-java-script-review

```mermaid
sequenceDiagram
    participant browser
    participant server

Note left of server: the browser submits the note (text/html) to the server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
Note left of server: the server adds the note to notes together with the date, but does not save the new note to a database
    server-->>browser: HTTP Status 302 (="Found"): URL redirect for browser to GET "Location" (which is ".../exampleapp/notes")
    deactivate server

    browser->>server: GET ...exampleapp/notes (=get the HTML, the page from .../notes)
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON: a list of dictionaries (in Python terms at least) with the notes and their dates
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

```
