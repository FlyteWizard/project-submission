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

* [Live Demo](https://project-submission-dominique.herokuapp.com/)
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

Now, head over to `Develop > Database > Rules`.

Make sure the rules look like the following:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

Lastly, set up Google Auth for the login. Go to `Develop > Authentication > Connection Method`.

1. Activate Google for login.

### Run the App

Now that everythin is setup, you can run the app locally.

```bash
npm start
```

The application should open in a new tab in your browser, but if it doesn't go to [http://localhost:3000/](http://localhost:3000/).

### Host with Heroku

Head over to https://dashboard.heroku.com/apps and log into your account. 

1. Create a new app (Name it and Click create app)
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Log into Heroku through the command line.

```bash
heroku login
```

4. Create a new Git repository

```bash
cd my-project/
heroku git:remote -a app-name
```

5. Deploy your application

```bash
git add .
git commit -am "make it better"
git push heroku master
```

Head over to https://console.firebase.google.com/ and log into your account.

1. Go to `Develop > Authentication > Connection Method`
2. Scroll to the bottom to `Authorized Domains`
3. Click `Add a Domain`
4. Add `my-app-name.herokuapp.com`

It will take awhile for the new domain to be authorized. After it is authorized, you will be able to login using Google Authentication on the heroku hosted app.