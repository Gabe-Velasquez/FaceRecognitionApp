import React, { Component } from 'react';
// import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform.js';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import 'tachyons';
import './App.css';

// const app = new Clarifai.App({
//   apiKey: '66e66da1b0c145848846e43a86159d84'
//  });
//  const setupClarifai = (imageUrl) =>{

//  }

     ///////////////////////////////////////////////////////////////////////////////////////////////////
     // In this section, we set the user authentication, user and app ID, model details, and the URL
     // of the image we want as an input. Change these strings to run your own example.
     //////////////////////////////////////////////////////////////////////////////////////////////////
    const returnClarifaiRequestOptions = (imageUrl) => {
     // Your PAT (Personal Access Token) can be found in the portal under Authentification
     const PAT = '43edef596f624df58ec117a0a4ec58a1';
     // Specify the correct user_id/app_id pairings
     // Since you're making inferences outside your app's scope
     const USER_ID = 'gvelas01';       
     const APP_ID = 'Face-Recognition';
     // Change these to whatever model and image URL you want to use
     const MODEL_ID = 'face-detection';
     const MODEL_VERSION_ID = '5e026c5fae004ed4a83263ebaabec49e';    
     const IMAGE_URL = imageUrl;
 
     ///////////////////////////////////////////////////////////////////////////////////
     // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
     ///////////////////////////////////////////////////////////////////////////////////
 
     const raw = JSON.stringify({
         "user_app_id": {
             "user_id": USER_ID,
             "app_id": APP_ID
         },
         "inputs": [
             {
                 "data": {
                     "image": {
                         "url": IMAGE_URL
                     }
                 }
             }
         ]
     });
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
  return requestOptions
    }
     
 
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => { 
    this.setState({imageUrl: this.state.input})
    // app.models.predict('face-detection', this.state.input)
    fetch("https://api.clarifai.com/v2/models/" + 'face-dectection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
         .then(response => response.json())
    .then(response => {
      console.log('meow', response)
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
          this.setState(Object.assign(this.state.user, {entries: count}))
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
      <FaceRecognition imageUrl={this.state.imageUrl} />
    </div>
  );
  }
}

export default App;
