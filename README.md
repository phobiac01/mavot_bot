_# mavot_bot

Lore retention and user management bot for the Dragonscape discord server

== Project Notes =============
API Routes:
- GET | /heartbeat | Responds with API, DB, and Bot status info
- GET | /authState | Responds with current status of the provided session token
- POST | /login | Sends information for logging in, responds with JWT or Error Status
- POST | /logout | Clears active session, removes JWT cookie, closes websocket
- POST | /password-change | Sends over old password, valid JWT session, and new password (encrypted and decrypted with jwt session ID)
-=-=-=-
- POST | /begin-websocket | Starts a fresh websocket conenction using JWT token for authentication (returns with existing session if available, otherwise starts new connection)
- UPDATE | /reconnect-websocket | Attempts to reconnect a websocket conenction if it exists

Websocket "Routes":
// Queries are formed dynamically using the shape of the database EX: `> retrieve [group1-group2-group3-target]`
// Once a Websocket connection has been established it is maintained in the background, thus is persistent across page navigation
- retrieve `[species-civilizations-cities]`
- update `[species-drekir-desert-title value="Spiky Cactus Bois With The Big Butts"]`
- delete `[species-drekir-taiga]`
- upload `[media_species-drekir-forest] file-name {file}`

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
    > View and log out of active sessions_
