import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';






const particlesOption={
            		particles: {

            			number:{
            				value:90,
            				density:{
            					enable:true,
            					value_area:800
            				}
            			},
            			
            		}
            	};
const initialState={
      input:'',
      imageLink:'',
      box:'',
      route:'signin',
      isSignedIn:false,
      user:{

        id:'',
      email:'',
      name:'',
      
      entries:0,
      joined:''


      }
    }
class App extends Component {

	constructor(){

		super();

		this.state=initialState;
	}

  calculateFaceLocation=(data)=>{



    const resp=data.outputs[0].data.regions[0].region_info.bounding_box;
    const imagetag=document.getElementById('imagine');
    const height=imagetag.height;
    const width=imagetag.width;

    //console.log(height,width);
    return{

      leftCol: resp.left_col * width,
      topRow: resp.top_row * height,
      rightCol: width-(resp.right_col * width),
      bottomRow: height - (resp.bottom_row * height),
    }



  }

	onInputChange=(event)=>{
       this.setState({input:event.target.value});

	}

  onRouteChange=(route)=>{
    if(route==='home'){
      this.setState({isSignedIn:true});

    }else if(route==='signin'){


      this.setState(initialState);
    }

    this.setState({route:route});
  }

  displayFaceBox=(box)=>{
    //console.log(box);


     this.setState({box:box});

  }

  loadUser=(data)=>{

    this.setState({user:{

      id:data.id,
      name:data.name,
      email:data.email,
      
      entries:data.entries,
      joined:data.joined



    }});


  }

  componentDidMount(){


    fetch('https://lit-inlet-91556.herokuapp.com').then(response=>response.json()).then(console.log).catch(err=>{

      console.log(err);
    });
  }

  onButtonSubmit=()=>{
    this.setState({imageLink: this.state.input});


    fetch('https://lit-inlet-91556.herokuapp.com/imageApi',{

      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({

        input:this.state.input,
      })
    }).then(response=>response.json()).catch(err=>{

      console.log(err);
    })



.then(response=>{



  if(response){

    fetch('https://lit-inlet-91556.herokuapp.com/image',{

      method:'put',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({

        id:this.state.user.id,
      })
    }).then(data => data.json()).then(count =>{

      this.setState(Object.assign(this.state.user,{entries:count}));
    });


  }



  this.displayFaceBox(this.calculateFaceLocation(response))}).catch(err=>console.log(err));

    console.log('cliked');
  }
  render() {

    const {imageLink,box,isSignedIn,route,}=this.state;
    return (
      <div className="App">

                <Particles className="particles"
                    params={particlesOption}

                    />
                    
              <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
              {route==='home'

              ?
              <div>
                    <Logo />
                    <Rank name={this.state.user.name} entries={this.state.user.entries} />
                    <ImageLinkForm changeOn={this.onInputChange} onSubmit={this.onButtonSubmit}/>
                    <FaceRecognition image={imageLink} box={box}/>

              </div>
              :
              (route==='signin'

              ?

                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

                :

                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />




              )


            

            }

        
        
      </div>
    );
  }
}

export default App;
