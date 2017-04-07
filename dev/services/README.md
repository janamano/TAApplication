## Running the Backend

The commands below are assuming that the current working directory is 
`proj-TopOfTheHeap/dev/services/src`.

To run:

1. **If running for the first time:** `npm install`.
2. `npm install mongodb`
3. `npm install mongoose`
4. Open new terminal.
5. run `mongod`
6. Go back to previous terminal.
7. `node main.js`

The server should now be up and running (on port 8080).

To test:
* **If running for the first time:** `npm install mocha`
* `node fake.js -p` to populate the running database instance.
* `node fake.js -c` to clean the running database instance.
* (**Server should no longer be running**) `mocha` to run tests in `proj-TopOfTheHeap/dev/services/src/test`
