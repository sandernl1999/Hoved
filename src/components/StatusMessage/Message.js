import React from "react";

/**
 * Denne komponenten render en respons-melding som f.eks error og sukess.
 */

const Message = ({message, setMessage, type}) => {
    return (
        <div style={type === 'error' ? {backgroundColor: "red", padding: "10px"} : {backgroundColor: "green", padding: "10px"}}>
			<div style={{ color: "white", fontSize: 14}}>
				<label>{message}</label>
				<span style={{marginLeft: "120px", cursor: "pointer", fontSize: "18px"}} onClick={()=>setMessage("")}>x</span>
			</div>            
		</div>
    )
}

export default Message;