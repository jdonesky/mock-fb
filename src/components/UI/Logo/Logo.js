import React from 'react' 
import logoImg from '../../../assets/images/logo.png'
import classes from './Logo.css'

const logo = props => (
    <div className={classes.Logo}>
       <img src={logoImg} alt="dumb facebook logo" />
    </div>
)

export default logo;