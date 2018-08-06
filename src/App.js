import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { Nav, Navbar, Button, Modal } from 'react-bootstrap';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleAddStackButtonClick = this.handleAddStackButtonClick.bind(this);

    this.state = {
      postAddStack: false,
      stacksList: [{
                    name: '',
                    status: '',
                    uuid: '',
                    template: '',
                }],
    };
  }

  componentDidMount () {
    axios.get('http://localhost:9999/controltower/stacks', {
      responseType: 'json'
    }).then(response => {
      this.setState({ stacksList: response.data });
    }).catch(function (error) {
      console.log(error);
    });
  }

  handleAddStackButtonClick() {
    this.setState({ postAddStack: true });
    axios.post('http://localhost:9999/controltower/stacks', {
        name: 'Hello There',
        template: 'alm'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  stacksListTableRow() {
    return this.state.stacksList.map(function(r) {
      return <tr><td>{r.id}</td><td>{r.status}</td><td>{r.name}</td><td>{r.UUID}</td><td>{r.template}</td></tr>
    });
  }

  render() {
    console.log("inside render");
    console.log(this.state);

    return (
      <div className="App">
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Sandbox Control</a>
          <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
          <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
              <a class="nav-link" href="#">Sign out</a>
            </li>
          </ul>
        </nav>
        <div class="container-fluid">
          <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
              <div class="sidebar-sticky">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a class="nav-link active" href="#">
                      <span data-feather="home"></span>
                      Dashboard <span class="sr-only">(current)</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <span data-feather="file"></span>
                      Stacks
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <span data-feather="shopping-cart"></span>
                      Docs
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <span data-feather="layers"></span>
                      Integrations
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h2 class="h2">Stacks</h2>
                <div class="btn-toolbar mb-2 mb-md-0">
                  <button class="btn btn-sm btn-outline-secondary" onClick={this.handleAddStackButtonClick}>
                    + Add a Stack
                  </button>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Name</th>
                      <th>UUID</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.stacksListTableRow()}
                    <tr>
                      <td>1,002</td>
                      <td>amet</td>
                      <td>consectetur</td>
                      <td>adipiscing</td>
                      <td>elit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
