import  React, { useContext } from 'react'
import { Context } from '../context/context'

export const Banner = () => {
    const {correctWords, wrongWords} = useContext(Context)

    function percent() {
        return Math.floor((correctWords / (correctWords + wrongWords) * 100))
    }

    return (
        <div className="info center">
            <h1 className="data">Correct words: {correctWords}</h1>
            <h1 className="data">Wrong words: {wrongWords}</h1>
            <h1 className="bar-box">
                <div className="data">Accuracy: <small>{percent()}%</small></div>
                <div className="bar-row">
                    <div className="bar-level" style={{width: percent() + '%'}}></div>
                    <div className="bar-level shadow" style={{width: percent() + '%'}}></div>
                </div>
            </h1>
        </div>
    )
}