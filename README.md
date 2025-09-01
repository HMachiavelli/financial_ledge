# Financial Ledge
API for a simple financial ledge.

# Running instructions

Install npm packages with:
`npm install`

Then, to run the project, it is required to setup the SQLite database first. Do so by running:
`npm run migrate`

To start the nodemon server, run:
`npm start`

To execute unit tests, run:
`npm run test`

# Notes

- Using TS or API authentication were not done to save time and coplexity;
- Using integers instead of UUIDs for primary key IDs, thinking about scalability, integers work better with larger tables and indexes;
- All IDs are auto-generated;
