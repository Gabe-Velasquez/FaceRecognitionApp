import React from "react";
import { Tilt } from "react-tilt";
import robot from './robot.png';
import './logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br shadow-2' options={{max: 65}} style={{ height: 200, width: 200 }}>
                <div className='Tilt-inner pa5'><img style={{paddingTop: '5px'}} src={robot} alt='logo'></img></div>
            </Tilt>
        </div>
    );
}

export default Logo;