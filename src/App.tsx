import React, {useState} from 'react';
import './App.css';
import {Button} from "./components/button/button";
import {Settings} from "./components/settings/settings";




export const App: React.FC = () => {

    let [value, setValue] = useState<number>(0)
    let [count, setCount] = useState<number>(value)
    // console.log(value)
    let [maxValue, setMaxValue] = useState<number>(0)
    let [step, setStep] = useState<number>(1)
    let [dis, setDis] = useState<boolean>(true)


    const statusStartValue = (value: number) => {
        setValue(value)
    }
    const statusMaxValue = (value: number) => {
        setMaxValue(value)
    }

    const setDisabled = (event: boolean) => {
        setDis(event)
    }
    const setStepValue = (event: number) => {
        setStep(event)
    }

    let Max: number = maxValue

    const upCount = () => {
        if (count < maxValue) {
            let newCount = count + step
            setCount(newCount)
        }
    }

    const switchSetCount = () => {
        setCount(value)
    }

    let container = {
        border: "2px solid yellow",
        borderRadius: "20px",
        marginLeft: "20px"
    }

    let scoreboardView = {
        width: "500px",
        height: "100px",
        display: "flex",
        backgroundColor: "grey",
        borderRadius: "20px",
        margin: "10px 10px",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "5vh",
        border: "3px solid green"

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
        fontSize: "4vh"

    }
    let buttonStyle_ = {
        width: "500px",
        height: "100px",
        backgroundColor: "rgba(219,110,85,0.9)",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin: "10px",
        border: "3px solid green",
        fontSize: "5vh"

    }
    let IncorrectValue = {
       color: "red"

    }

    let viewScore = value < 0 ? <div style={IncorrectValue}>Incorrect value</div>
        : value === maxValue ? <div style={IncorrectValue}>Incorrect value</div>
            : value > maxValue ? <div style={IncorrectValue}>Incorrect value</div>
                :<div>Please enter value and click SET</div>;

    let BasicView = dis ? viewScore
                : count

    let isDisabled = count === Max ? true
        : dis ? true
            : false

    let Disabled = count === Max ? false : true;

    return (
        <div className="App">
            <header className="App-header">
                <Settings
                    title={"set"}
                    // onClick={upCount}
                    statusStartValue = {statusStartValue}
                    statusMaxValue={statusMaxValue}
                    setDisabled={setDisabled}
                    BooleanForSetButton={dis}
                    setCount={setCount}
                    setStepValue={setStepValue}
                    // switchSetCount={switchSetCount}
                    // upCount={upCount}
                />
                <div style={container}>
                    <div style={count === Max ? buttonStyle_ : buttonStyle }>{BasicView}</div>
                    <div style={buttonStyle}>
                        <Button title={"inc"}
                                onClick={upCount}
                                disable={isDisabled}
                        />
                        <Button title={"reset"}
                                onClick={switchSetCount}
                                disable={Disabled}
                        />
                    </div>
                </div>
            </header>
        </div>
    );
}


