import React from 'react';


interface ButtonProps {
    value: string;

  }


  function Button(props: ButtonProps){
    return(
        <div>
          <input type="submit" value={props.value}/>
        </div>
    );

};

export default Button;