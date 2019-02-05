import React from 'react'
import classes from './Input.css'

const input = (props) => {

    var inputElem=null;

    const cls = [classes.InputElem];
    if(props.invalid && props.touched){
        cls.push(classes.Invalid);
    }

    switch(props.inputtype){
        case 'input':
            inputElem=<input onChange={props.onChange} className={cls.join(' ')} {...props.config} value={props.value} />
            break;
        case 'textarea':
            inputElem=<textarea onChange={props.onChange} className={cls.join(' ')} {...props.config}  value={props.value} />
            break;
        case 'select': 
            inputElem=(<select onChange={props.onChange} className={cls.join(' ')} value={props.value} >
                        {props.config.options.map(option => {
                            return <option key={option.value} value={option.value} >{option.displayValue}</option>;
                        })}
                    </select>)
            break;
        default:
            inputElem=<input className={cls.join(' ')} {...props.config} />
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElem}
        </div>
    );
}

export default input;