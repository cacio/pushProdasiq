import React from 'react';
import isReachable from 'is-reachable';
import 'regenerator-runtime/runtime';
import Button from '@material-ui/core/Button';
const url = require('url')
const path = require('path');
const { remote } = require('electron');
const dialog   = remote.dialog

import BoxAlert from '../screen/alerta/app-alert';

const URL = 'https://jsonplaceholder.typicode.com/posts';
const EVERY_SECOND = 1000;
export default class Home extends React.PureComponent {
  _isMounted = true;
  state = { online: false }

 componentDidMount() {
    setInterval(async () => {
      const online = await isReachable(URL);      
      if(!online){
        const warpper = document.querySelector('.wrapper');
        warpper.classList.remove('hide');
      }
      if (this._isMounted) {
        this.setState({ online });
      }
    }, EVERY_SECOND);
  }

  componentWillUnmount() {
    this._isMounted = false;
    
  }

  messageb = () =>{      
      let iconPath = path.join(__dirname, '../../images/iconTemplate.png')
      let WIN      = remote.getCurrentWindow()
      let options = {}
      options.icon     = iconPath
      options.title    = "Prodasiq"
      options.type     = 'warning'
      options.buttons  = ["&Sim","&Não"]
      options.message  = "Deseja fechar ?"
      
      dialog.showMessageBox(WIN, options) .then(box => {
        console.log(box.response);
        if(box.response == 0){
          WIN.destroy()    
        }
      }).catch(err =>{
        console.log(err)
      }); 
      
      console.log('teste');
  } 

  
  
  render() {    
    return (
      
      <div className="container" id="container">
        
        <BoxAlert 
          nome={this.state.online ? "Você está online agora" : "Você está offline agora"} 
          title={ this.state.online ? "Viva! internet está conectada": "Ops! Internet desconectada." } 
          icon={this.state.online}/>
        
        <p id="token"></p>
        <Button variant="contained"  color="primary" onClick={()=>{this.messageb()}}>teste</Button>
      </div>
    )
  }
}