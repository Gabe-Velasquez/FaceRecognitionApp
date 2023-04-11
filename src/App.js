import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform.js';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import 'tachyons';
import './App.css';

const app = new Clarifai.App({
  apiKey: '66e66da1b0c145848846e43a86159d84'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit =()=>{
    console.log('click');
    app.models.predict('face-detection', this.state.input)
    .then(response => {
      console.log('hi', response)
      if (response){
        fetch('https://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id:this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries:}))
        })
      }
    })
    
  }

  render() {
  return (
    <div className="App">
      <ParticlesBg type="square" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      {/* <FaceRecognition /> */}
    </div>
  );
  }
}

export default App;
