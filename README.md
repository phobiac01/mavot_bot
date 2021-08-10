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
        -=-=-=-
        - POST | /begin-websocket | Starts a fresh websocket conenction using JWT token for validation (returns with existing session if available, otherwise starts new connection)
        - GET | /reconnect-websocket | Attempts to reconnect a websocket conenction if it exists

    Websocket "Routes":
        - retrieve [top, details, all] [topics, species, civilizations, cities]
        - update [species-drekir-desert-title:"Spiky Cactus Bois With The Big Butts"]
        - delete [species-drekir-taiga]
        - upload [media, species-drekir-forest] file-name {file}

    Web Pages:
        - Login page
            > No signup, only login / passwd change
        - Main DB Manipulation page
            > DB traversal graph / tree
            > Ability to rearrange, add, delete, nest, and sort categories and topics
            > Quick actions (restart, botsay, etc)
            > Bot stats and usage metrics
        - Custom Bot Responses page
            > Self-explanitory
        - Image Management page
            > Upload, rename, reassign, replace, and delete image assets
        - Audit page
            > List of changes and ability to revert
        - User Options page
            > Change pfp
            > Change displayname
            > Change password
            > View and log out of active sessions