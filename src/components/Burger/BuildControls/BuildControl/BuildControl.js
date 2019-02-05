import React from 'react'
import classes from './BuildControl.css'

const buildControl=(props)=>(
    <div className={classes.BuildControl}>
        <label className={classes.label}>{props.label}</label>
        <button className={classes.More} onClick={()=>props.onClick(true)}>More</button>
        <button className={classes.Less} disabled={props.disabled} onClick={()=>props.onClick(false)}>Less</button>
    </div>
)

export default buildControl;