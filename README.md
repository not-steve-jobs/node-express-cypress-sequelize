# Account Management Backend

### The task 🧩

Your task is to build a backend service that implements the [Account Management API](api-specification.yml). This API defines a set of operations for creating and reading account transactions. You can use [editor.swagger.io](https://editor.swagger.io/) to visualize the spec.

### What we expect from you ⏳

- **Make the provided API tests pass**. We added a set of API tests. See the [instructions below](#running-the-api-tests-locally-%EF%B8%8F) covering how to run them locally. 
- **Use an SQLite database as the service datastore.** We want to see how you design the database schema and SQL queries for working with the service data. Please use [SQLite](https://www.sqlite.org/index.html) as a DB engine.
- **Optimize the GET endpoints for speed.** When designing your service, ensure that the GET endpoints remain fast with the database growing in size.
- **Ensure no lost updates.** When submitting a new transaction, make sure no account balance updates are lost. E.g., when having two concurrent requests updating the same account balance.
- **Minimize the number of SQL queries for fetching max transaction volume.** Try to do it with ideally a single SQL query.
- **Organize your code as a set of low-coupled modules**. Avoid duplication and extract re-usable modules where it makes sense, but don't break things apart needlessly. We want to see that you can create a codebase that is easy to maintain.
- **Document your decisions.** Extend this README.md with info about how to run your application along with any hints that will help us review your submission and better understand the decisions you made.
- **If you will face some problems with SQLite you can use MongoDB, but tasks done with SQLite will have privileges.

### Before you get started ⚠️

1. Use the manual setup:
    1. Update the `apiUrl` (where your app will run) in [cypress.json](cypress.json).
    2. Update the [`build`](package.json#L5) and [`start`](package.json#L6) scripts in [package.json](package.json) to respectively build and start your app. **[See examples](https://www.notion.so/devskills/Backend-78f49bea524148228f29ceb446157474)**.

### Running the API tests locally ⚙️

* Run `npm install`.
* Run your app.
* Run the tests with `npm run test`.

### When you're done ✅

Please share with us the github repository

**If you don't have enough time to finish**, push what you got and describe how you'd do the rest in a `.md` file.

### Time estimate ⏳

About **4 hours**.

---