// Import React
import React, { Component } from 'react';
// Import Logo
import logo from './logo.png';
// Import Firebase and Auth
import firebase, { auth, provider } from './firebase.js';
// Import CSS
import './App.css';

// Main
class App extends Component {
  // Contructor - Sets defaults
  constructor() {
    super();
    this.state = {
      codeLink: '',
      reportLink: '',
      liveLink: '',
      projectName: '',
      items: [],
      user: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  // HandleChange Function
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // Logout Function
  // Sets user to null
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  // Login Function
  // Sets user
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  // HandleSubmit Function
  // Sends the form information to Firebase
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      code: this.state.codeLink,
      report: this.state.reportLink,
      live: this.state.liveLink,
      project: this.state.projectName,
      user: this.state.user.displayName || this.state.user.email
    }
    itemsRef.push(item);
    // Resets form
    this.setState({
      codeLink: '',
      reportLink: '',
      liveLink: '',
      projectName: ''
    });
  }

  // RemoveItem Function
  // Lets itemID as a parameter
  removeItem(itemId) {
    // Removes item from firebase
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  // ComponentDidMount Function
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          code: items[item].code,
          report: items[item].report,
          live: items[item].live,
          project: items[item].project,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  render() {
    return (
      <div>
        {/* Header */}
        <header>
          {/* Navigation */}
          <nav className="navbar navbar-expand-md navbar-light bg-pink">
            <a className="navbar-brand" href="/">
              <img src={logo} width="30" height="30" className="header-logo d-inline-block align-top" alt="Project Submission Logo"/>
              Project Submission
            </a>
            {/* Mobile Navigation */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* Links */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" rel="noopener noreferrer" target="_blank" href="https://github.com/FlyteWizard/project-submission"><i className="fab fa-github"><span className="sr-only">Github Icon</span></i> Github</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" rel="noopener noreferrer" target="_blank" href="https://github.com/FlyteWizard/project-submission/blob/master/report/CSC130-Project2-V00832004.pdf"><i className="fas fa-book"><span className="sr-only">Book Icon</span></i> Documentation</a>
                </li>
                {/* If user is logged in they see logout */}
                {/* If user is logged out they see login */}
                {this.state.user ?
                  <li className="nav-item">
                    <button className="btn btn-dark" onClick={this.logout}><i className="far fa-user"><span className="sr-only">Person Icon</span></i> Log Out</button>
                  </li>
                  :
                  <li className="nav-item">
                    <button className="btn btn-dark" onClick={this.login}><i className="far fa-user"><span className="sr-only">Person Icon</span></i> Log In</button>
                  </li>
                }
              </ul>
            </div>
          </nav>
        </header>
        {/* Main Content */}
        {/* If they are logged in they see the content */}
        {/* If they are logged out they see the message to login */}
        {this.state.user ?
          <div>
            {/* Profile Image */}
            <div className="user-profile">
              <img src={this.state.user.photoURL} alt="Profile" />
            </div>
            {/* Submission Form */}
            <main className="container">
              <section className="row add-item">
                  <form className="col-12 col-md-6" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="field1">Full Name</label>
                      <input className="form-control" id="field1" type="text" name="userName" placeholder="FirstName LastName" onChange={this.handleChange} value={this.state.user.displayName || this.state.user.email} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field2">Project Name</label>
                      <input className="form-control" id="field2" type="text" name="projectName" placeholder="Project Name" onChange={this.handleChange} value={this.state.projectName} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field3">Live Deploy Link</label>
                      <input className="form-control" id="field3" type="text" name="liveLink" placeholder="https://" onChange={this.handleChange} value={this.state.liveLink} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field4">PDF Report Link</label>
                      <input className="form-control" id="field4" type="text" name="reportLink" placeholder="https://" onChange={this.handleChange} value={this.state.reportLink} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field5">Code Link (Github, GitLab)</label>
                      <input className="form-control" id="field5" type="text" name="codeLink" placeholder="https://" onChange={this.handleChange} value={this.state.codeLink} />
                    </div>
                    <button className="btn btn-primary">Submit Project</button>
                  </form>
              </section>
              {/* Projects */}
              <section className="row display-item">
                {this.state.items.map((item) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                      <div className="project">
                        <h3>{item.project}</h3>
                        <p>Author: {item.user}</p>
                        <p>Live Deploy:
                          <a className="item-link" rel="noopener noreferrer" target="_blank" href={item.live}>
                            &nbsp;
                            <i className="fas fa-external-link-alt"><span className="sr-only">
                              External Link Icon</span>
                            </i>
                            &nbsp;Link
                          </a>
                        </p>
                        <p>Report:
                          <a className="item-link" rel="noopener noreferrer" target="_blank" href={item.report}>
                            &nbsp;
                            <i className="fas fa-external-link-alt"><span className="sr-only">
                              External Link Icon</span>
                            </i>
                            &nbsp;Link
                          </a>
                        </p>
                        <p>Code:
                          <a className="item-link" rel="noopener noreferrer" target="_blank" href={item.code}>
                            &nbsp;
                            <i className="fas fa-external-link-alt"><span className="sr-only">
                              External Link Icon</span>
                            </i>
                            &nbsp;Link
                          </a>
                        </p>
                        {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                          <button onClick={() => this.removeItem(item.id)} className="btn btn-danger">Remove Project</button> : null
                        }
                      </div>
                    </div>
                  )
                })}
              </section>
            </main>
          </div>
          :
          <main className="container">
            <div className="row">
              <div className="col-12 message">
                <p>You must be logged in to see the projects list and submit to it.</p>
              </div>
            </div>
          </main>
        }
      </div>
    );
  }
}

export default App;
