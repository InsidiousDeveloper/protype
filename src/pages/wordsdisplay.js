import React, { useContext, useEffect, useRef, useState } from 'react'
import {Top200} from '../words/top200'
import { Context } from '../context/context'

export const Display = () => {

    const toDisplay = []
    const [arr, setArr] = useState([])
    const [stack, setStack] = useState(0)
    const {space, checking, setSpace, setCorrectWords, setWrongWords} = useContext(Context)
    const toRemove = useRef(null)
    

    useEffect(() => {
        for (let i = 0; i < 30; i++) {
            toDisplay[i] = Math.floor(Math.random() * Top200.length)
        }

        return setArr([...toDisplay])
    },[stack])

    useEffect(() => {
        if (toRemove.current) {

            if (toRemove.current.innerHTML == checking.current) {
                setCorrectWords(prev => prev + 1)
                toRemove.current.classList.add('correct')
            } else {
                setWrongWords(prev => prev + 1)
                toRemove.current.classList.add('wrong')
            }
            toRemove.current.classList.remove('active')
        }

        const getter = document.querySelector(`.\\3${stack} ${space}`)
        getter.classList.add('active')
        toRemove.current = getter

        if (space != 0 && space % 30 == 0) {
            setSpace(prev => 0)
            return setStack(stack + 1)
        }
        
    }, [space])
    
    
    return (
        <div className="list">
            {
                
                Top200.map((word, index) => {
                    // console.log(arr)
                    // if (stack == 1) {
                    //     return <span key={index} className={`${stack}${index.toString()}`}>{Top200[arr[index]]}</span>
                    // } else if (stack == 2) {
                    // }
                    return <span key={index} className={`${stack}${index.toString()}`}>{Top200[arr[index]]}</span>
                }, [stack])
            }
        </div>
    )
}
