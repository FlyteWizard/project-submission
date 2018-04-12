import React, { Component } from 'react';
import logo from './logo.png';
import firebase, { auth, provider } from './firebase.js';
import './App.css';

class App extends Component {

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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

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
    this.setState({
      codeLink: '',
      reportLink: '',
      liveLink: '',
      projectName: ''
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

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
        <header>
          <nav className="navbar navbar-expand-md navbar-light bg-pink">
            <a className="navbar-brand" href="/">
              <img src={logo} width="30" height="30" className="header-logo d-inline-block align-top" alt="Project Submission Logo"/>
              Project Submission
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="https://github.com/FlyteWizard/project-submission"><i className="fab fa-github"><span className="sr-only">Github Icon</span></i> Github</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://github.com/FlyteWizard/project-submission"><i className="fas fa-book"><span className="sr-only">Book Icon</span></i> Documentation</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/"><i className="far fa-user"><span className="sr-only">Person Icon</span></i> About</a>
                </li>
                {this.state.user ?
                  <li className="nav-item">
                    <button className="btn btn-dark" onClick={this.logout}>Log Out</button>
                  </li>
                  :
                  <li className="nav-item">
                    <button className="btn btn-dark" onClick={this.login}>Log In</button>
                  </li>
                }
              </ul>
            </div>
          </nav>
        </header>
        {this.state.user ?
          <div>
            <div className="user-profile">
              <img src={this.state.user.photoURL} alt="Profile" />
            </div>
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
                      <input className="form-control" id="field3" type="text" name="liveLink" placeholder="Live Deploy Link" onChange={this.handleChange} value={this.state.liveLink} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field4">PDF Report Link</label>
                      <input className="form-control" id="field4" type="text" name="reportLink" placeholder="PDF Report Link" onChange={this.handleChange} value={this.state.reportLink} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field5">Code Link (Github, GitLab)</label>
                      <input className="form-control" id="field5" type="text" name="codeLink" placeholder="Code Link" onChange={this.handleChange} value={this.state.codeLink} />
                    </div>
                    <button className="btn btn-primary">Submit Project</button>
                  </form>
              </section>
              <section className="row display-item">
                {this.state.items.map((item) => {
                  return (
                    <div className="col-12 col-md-4 col-lg-3" key={item.id}>
                      <div className="project">
                        <h3>{item.project}</h3>
                        <p>Author: {item.user}</p>
                        <p>Live Deploy: <a className="item-link" href={item.live}>link</a></p>
                        <p>Report: <a className="item-link" href={item.report}>link</a></p>
                        <p>Code: <a className="item-link" href={item.code}>link</a></p>
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
