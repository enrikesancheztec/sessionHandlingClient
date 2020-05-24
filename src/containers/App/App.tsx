import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../../components/Routes/Routes';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <Menu handleLogout={this.handleLogout} />
          <Routes />
        </BrowserRouter>
      </div>
    )
  }

  handleLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    sessionStorage.removeItem("token");
    window.location.href = '/'
  }
}

export default App;
