# Financial Ledge
API for a simple financial ledge.

# Running

To run the project it's required to setup de SQLite database first. Do so by running:
`npm run migrate`

To start the nodemon server, run:
`npm start`

To execute unit tests, run:
`npm run test`

# Candidate notes

- I haven't done some things to save time and complexity, like using TS or API authentication;
- I chose to use integers instead of UUIDs for primary key IDs, thinking about scalability, integers work better with larger tables and indexes;
- All IDs are auto-generated.
