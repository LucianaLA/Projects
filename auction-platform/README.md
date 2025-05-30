## Auction platform
# Frontend: React and TypeScript
- Audio + video live streaming
- Client login and profile
- live bidding
- catalogue
# Backend: Node.js (Express + TypeScript)
- live clerking
- auctioneer screen
- client details management
- auction management: catalogue, invoicing
- basic frontend management
# Databases
PostgreSQL?

## To do: 
1. Basic API design and routes
Define core REST endpoints:
- GET /auctions — list auctions
- GET /auctions/:id — get auction details
- POST /auctions/:id/bid — place a bid
Organize routes/controllers (e.g., routes/auctionRoutes.ts, controllers/auctionController.ts)

2. Database integration
Pick a database (PostgreSQL, MongoDB, etc.)
Set up an ORM/ODM:
- For SQL: TypeORM, Prisma (super popular and TS-friendly!)
- For NoSQL: Mongoose for MongoDB
Define models/schemas for auctions, users, bids

3. Authentication & user management
Implement user signup/login (JWT or sessions)
Protect bidding endpoints for logged-in users only

4. Live bidding (WebSocket or Socket.IO)
Real-time updates for bids and auction status
Use Socket.IO on your Node backend and React frontend

5. Frontend
Set up React Router, pages for:
- Auction catalogue (list of auctions)
- Auction detail (show current highest bid, bid input)
- Login/signup
Fetch data from your backend APIs with Axios or Fetch
Handle real-time bid updates with Socket.IO client

6. Live streaming (optional/advanced)
Integrate video/audio streaming (e.g., Daily.co, Twilio Video)
Embed stream in auction detail page