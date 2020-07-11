import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {Button} from "../button/button";

type SettingsType = {
    title: string
    statusStartValue: (value: number) => void
    statusMaxValue: (value: number) => void
    setDisabled: (event: boolean) => void
    BooleanForSetButton: boolean
    setCount: (Dispatch<SetStateAction<number>>)
    setStepValue: (event: number) => void
}


export const Settings: React.FunctionComponent<SettingsType> = (props: SettingsType) => {


    let [startValue, setStartValue] = useState<number>(0)
    let [maxValue, setMaxValue] = useState<number>(0)
    let [step, setStep] = useState<number>(1)

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        let newStartValue = parseInt(event.currentTarget.value);
        setStartValue(newStartValue);
        props.statusStartValue(newStartValue);
    };
    const onChangeMaxValue = (event: ChangeEvent<HTMLInputElement>) => {
        let newMaxValue = parseInt(event.currentTarget.value);
        props.statusMaxValue(newMaxValue);
        setMaxValue(newMaxValue)
    };
    const onChangeValueStep = (event: ChangeEvent<HTMLInputElement>) => {
        let newSteptValue = parseInt(event.currentTarget.value);
        props.setStepValue(newSteptValue)
        setStep(newSteptValue);
    };

    useEffect(() => {

        const initialStartValue = Number(localStorage.getItem("startValue"))
        setStartValue(initialStartValue)
        const initialMaxtValue = Number(localStorage.getItem("maxValue"))
        setMaxValue(initialMaxtValue)
        const initialSteptValue = Number(localStorage.getItem("step"))
        setStep(initialSteptValue)
        props.statusStartValue(initialStartValue);
        props.statusMaxValue(initialMaxtValue);
        props.setStepValue(initialSteptValue)
        props.setDisabled(false)
        props.setCount(initialStartValue)

    }, []);

    const onSetEvent = () => {

        localStorage.setItem("startValue", JSON.stringify(startValue))
        localStorage.setItem("maxValue", JSON.stringify(maxValue))
        localStorage.setItem("step", JSON.stringify(step))

        props.setDisabled(false)
        props.setCount(startValue)

    };

    let container = {
        border: "2px solid yellow",
        borderRadius: "20px",
    }
    let buttonStyle = {
        width: "500px",
        height: "100px",
        backgroundColor: "grey",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin: "10px",
        border: "3px solid green",
        fontSize: "3vh",

    }
    let inputStyle = {
        height: "4vh",
        width: "50px",
        borderRadius: "10px",
        backgroundColor: "green",
        marginLeft: "20px",
        fontSize: "3vh",
    }
    let inputStyleStep = {
        height: "4vh",
        width: "50px",
        borderRadius: "10px",
        backgroundColor: "yellow",
        marginLeft: "20px",
        fontSize: "3vh",
    }
    let inputStyleMinus = {
        height: "4vh",
        width: "50px",
        borderRadius: "10px",
        backgroundColor: "red",
        marginLeft: "20px",
        fontSize: "3vh",
    }

    let BasicTernaryStyle = startValue < 0 ? inputStyleMinus
        : startValue === maxValue ? inputStyleMinus
            : startValue > maxValue ? inputStyleMinus
                : inputStyle;

    let DisabledButtonTernary = startValue < 0 ? true
        : startValue === maxValue ? true
            : startValue > maxValue ? true
                : false;


    return (
        <div style={container}>
            <div style={buttonStyle} onClick={() => props.setDisabled(true)}>
                <form>
                    max value:
                    <input style={BasicTernaryStyle}
                           type="number"
                           step={step}
                           onChange={onChangeMaxValue}
                           value={maxValue}
                    />
                </form>
                <form>
                    start value:
                    <input style={BasicTernaryStyle}
                           type="number"
                           onChange={onChangeValue}
                           step={step}
                           value={startValue}
                    />
                </form>
                <form>
                    step value:
                    <input style={inputStyleStep}
                           type="number"
                           onChange={onChangeValueStep}
                           value={step}
                           min={1}
                    />
                </form>
            </div>
            <div style={buttonStyle}>
                <Button title={props.title} onClick={onSetEvent} disable={DisabledButtonTernary}/>
            </div>
        </div>
    )
}