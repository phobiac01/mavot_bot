# mavot_bot

Lore retention and user management bot for the Dragonscape discord server

== Notes =============
API: 
    Routes:
        - GET | /heartbeat | Responds with API, DB, and Bot status info
        - GET | /auth-status | Responds with current status of the provided session token
        - POST | /login | Sends information for logging in, responds with JWT or Error Status
        - GET | /logout | Clears active session, removes JWT cookie, closes websocket
        - POST | /password-change | Sends over old password, valid JWT session, and new password (encrypted and decrypted with jwt session ID)

        - POST | /begin-websocket | Starts a fresh websocket conenction using JWT token for validation (returns with existing session if available, otherwise starts new connection)
        - GET | /reconnect-websocket | Attempts to reconnect a websocket conenction if it exists

    Websocket "Routes":
        - retrieve [top, details, all] [topics, species, civilizations, cities]
        - change [species-drekir-desert-title:"Spiky Cactus Bois With The Big Butts"]
        - delete [species-drekir-taiga]
        - upload [media, species-drekir-forest] file-name {file}