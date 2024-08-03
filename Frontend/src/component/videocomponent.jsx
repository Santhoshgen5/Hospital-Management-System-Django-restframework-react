import React, { useRef, useState } from 'react';
import VDO from '../assets/video/a.mp4'
import '../assets/css/VideoPlayer.css'
import { Link } from 'react-router-dom';
const VideoPlayer = ({scrollToLogin}) => {

  return (
    <>
    <div className='videocontainer'>
      <video  height={800} className="img-fluid myvideo" src={VDO} autoPlay loop muted/>
    </div>
    <div className='content'>
        <h1 style={{marginBottom:'4px'}}>WellCome To S.S Hospital Management System</h1>
        <h1>Tranfaming Your Care</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vel voluptate, pariatur sunt nihil necessitatibus?</p>
        <h3  style={{marginTop: '40px'}}><Link className='logintoaccess' onClick={scrollToLogin}>Login To Gain Access <i className="fa-solid fa-arrow-down"></i></Link></h3>
    </div>
    </>

  );
};

export default VideoPlayer;
