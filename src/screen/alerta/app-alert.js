import React,{useState} from 'react';
import { FiWifi,FiX,FiWifiOff } from 'react-icons/fi';

const wrapper = {
    position: 'relative',
    //top: '50%',
    left: '17%',
    marginTop:'10px',
    animation: 'show_toat 1s ease forwards',    
}

const toast = {
    background: '#fff',
    padding: '20px 15px 20px 20px',
    borderRadius: '10px',
    width: "330px",
    display: "flex",
    alignItems: 'center',    
    borderLeft:'5px solid #2ecc71',
    justifyContent: 'space-between',
    boxShadow: '1px 7px 14px -5px rgba(0, 0, 0, 0.15)',
}
const content = {
    display:'flex',
    alignItems:'center'
}

const icon = {
    fontSize:'25px',
    background:'#2ecc71',
    height:'50px',
    width:'50px',
    lineHeight:'50px',
    textAlign:'center', 
    borderRadius:'50%',
    color:'#fff'
}

const details = {marginLeft:'15px'}

const closeicon ={
    background:'#f2f2f2',
    height:'40px',
    width:'40px', 
    textAlign:'center',
    lineHeight:'40px',
    fontSize:'23px',
    cursor:'pointer',
    color:'#878787',
    borderRadius:'50%'
}

const offline = {
    background: '#fff',
    padding: '20px 15px 20px 20px',
    borderRadius: '10px',
    width: "330px",
    display: "flex",
    alignItems: 'center',    
    borderLeft:'5px solid #ccc',
    justifyContent: 'space-between',
    boxShadow: '1px 7px 14px -5px rgba(0, 0, 0, 0.15)',
}

const iconoffline = {
    background:'#ccc'
}
const hide = {
    animation: 'hide_toat 1s ease forwards'   
}


 function Close(){
    const warpper = document.querySelector('.wrapper');
    warpper.classList.add('hide');
}



const BoxAlert = (Props) =>  (
    <div className="wrapper" style={wrapper}>
        <div className="toast" style={Props.icon ? toast : offline}>
            <div className="content" style={content}>
                <div className="icon" style={Props.icon ? icon : {...icon,...iconoffline}}>{Props.icon === true ?<FiWifi  /> : <FiWifiOff />}</div>
                <div className="details" style={details}>
                    <span style={{fontSize:'20px',fontWeight:"500"}}>{Props.nome}</span>
                    <p style={{color:'#878787',margin:'0px'}}>{Props.title}</p>
                </div>
            </div>
            <div className="close-icon" style={closeicon} onClick={()=>Close()}><FiX /></div>
        </div>
    </div>
);

export default BoxAlert;