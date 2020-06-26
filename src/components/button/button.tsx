import React from "react";
import style from "./button.module.css"

type ButtonType = {
 title: string
    onClick: () => void
    disable: boolean


}

export const Button: React.FC <ButtonType> = (props:ButtonType) => {
    let button = {
        height: "auto",
        width: "auto",
        borderRadius: "10px",
        outline: "none",
        fontSize: "4vh",
    }


    return (
        <button className={style.Style} style={button} disabled={props.disable} onClick={props.onClick}>{props.title}</button>
    )

}