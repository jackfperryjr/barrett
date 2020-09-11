### The App
It's 2020, and your circle of friends is extremely bored due to quarantine. They constantly ask you for activity ideas. Because you're a developer, you write a program for this. You decide to use the [Bored API](https://www.boredapi.com/) to help you. For each of your friends, your app will:

* Display their name and email.
* Show a configurable activity parameter (activity type).
* Display your current activity idea for this friend. This should originate from the Bored API, and use the activity parameter above.

### Assignment
We've already sketched out a UI with some hard-coded data on the front-end, and populated a database with a list of our closest friends. We want to try to complete the following tasks:

1. Replace the hard-coded friend data in our front-end with data from the server. See `server/server.js` and `server/router.js` to explore the (very minimal) data and api structure.
2. Implement the "Get New Idea" button by making a request for a new activity to the Bored API from the front-end. Be sure to include the friend's `type` as part of the request. The new activity text should be rendered when received.
3. Finally, extend the behavior of the "Get New Idea" button to persist changes to the database. You will need to make changes to the back-end and front-end in order to complete this task. *(In Glitch, you can verify that persistence is working by clicking the refresh button above the app preview window.)*

Please spend no more than 1-2 hours working on this. We know you're busy!

### Running Locally

**Requires Node version >= 10.**

Open a terminal in the root directory of this project. 

Type `yarn` or `npm install` to install dependencies.

Next, start the app with `yarn start` or `npm start`. The server and client app will start concurrently.
<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
