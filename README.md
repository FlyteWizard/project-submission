# Project Submission

React.js Web App for CSC 130 - Spring 2018

## What Did I Use? 🐤

* [React.js](https://reactjs.org/)
* [Firebase](https://firebase.google.com/)
* [Bootstrap](https://getbootstrap.com/)
* [FontAwesome](https://fontawesome.com/)

## Databases 👩🏻‍💻

* Private: Firebase
* Public: https://baconipsum.com/json-api/

## Links 🔗

* [Live Demo]()
* [Report]()

## Run This Locally! 🚀

Want to run this locally? You can!

### Prerequisites

* [npm](https://www.npmjs.com/get-npm)
* [git](https://git-scm.com/)

### Obtain Local Copy

Clone the repository to your local computer.

```bash
// Change into your working directory
cd working/directory

// Clone the repository
git clone
```

Go into the folder

```bash
cd project-submission
```

Run `npm install` to install all the dependencies

```bash
npm install
```

### Set Up Firebase

In order for the app to run locally, you'll need to setup your own firebase databse.

1. Head to [firebase](https://firebase.google.com/) and login.
2. Click the `Get Started` button.
3. Click Add a New Project.
4. Name and and click `Create a Project`
5. Head over to `Project Overview` and click the `Add Firebase to a Web Application` button.

In your route directory for the project, create a copy of `.env.example` and rename the new file `.env.local`.

1. Copy the keys from the popup window into the correct `.env.local` variable.

```
REACT_APP_FIREBASE_API_KEY=1234asdf
```

Lastly, head over to `Develop > Database > Rules`.

Make sure the rules look like the following:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

### Run the App

Now that everythin is setup, you can run the app locally.

```bash
npm start
```

The application should open in a new tab in your browser, but if it doesn't go to [http://localhost:3000/](http://localhost:3000/).
