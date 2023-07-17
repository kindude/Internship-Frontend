import React from 'react';

interface InputProps {
    htmlFor: string;
    text: string;
    id: string;
    type:string;
    name:string;
    accept:string;
  }

function Input(props: InputProps){
    return(
        <div>
          <label htmlFor={props.htmlFor}>{props.text}</label>
          <input type={props.type} id={props.id} name={props.name} required accept={props.accept}/>
        </div>
    );

};

export default Input;