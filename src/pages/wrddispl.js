import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Context } from '../context/context'
import {Top200} from '../words/top200'

const useInit = () => {
    const toDisplay = []
    const [arr, setArr] = useState([])
    const [number, setNumber] = useState(0)

    for (let i = 0; i <= 40; i++) {
        toDisplay[i] = Math.floor(Math.random() * Top200.length)
    }

    Top200.map((wrd, index) => {
        if (number < 40) {
            setNumber(number + 1)
            setArr(prev => Top200[toDisplay[index]])
        }
    })

    return {
        arr
    }

}

const useDraw = () => {
    const {arr} = useInit()
}

// const useInitialize = () => {
//     // console.log('Init')
//     // const [newArr, setNewArr] = useState([])
//     const toDisplay = []
//     const [arr, setArr] = useState([])
//     const [passive, setActive] = useState('')
//     const {handlePress, space} = useContext(Context)

//     let number = 0

//     useEffect(() => {
//         Top200.map((wrd, index) => {
//             if (number < 40) {
//                 // loop below fills toDisplay Array with random values
//                 for (var i = 0; i <= 40; i++) {
//                     toDisplay[i] = Math.floor(Math.random() * (Top200.length - 0))
//                 }
//                 number++
                
//                 arr[number - 1] = Top200[toDisplay[index]]
//                 setArr(prev => arr)

//             }
//         })

//     }, [])

//     return  {
//         arr, toDisplay, space
//     }

// }

// function Draw() {
//     const {arr} = useInitialize()

//     return arr.map((elem, index) => {
//         console.log('displ')
//         return <span key={index} className={index.toString()}>{arr[index]}</span>
//     })
// }

export const Display = () => {

    const {arr} = useInit()

    console.log('refresh')
    

    // const draw2 = useMemo(() => {
    //     return Draw()
    // }, [toDisplay])

    // console.log(typeof(draw))

    // useEffect(() => {
    //     setTimeout(() => {
    //         // console.log(typeof(document.querySelector(`#\\3${space}`).className))
    //         document.querySelector(`.\\3${space}`).classList.add('active')
    //     }, 100)
    // }, [space])

    return (
        <>
            {
                arr.map((elem, index) => {
                    console.log('displ')
                    return <span key={index} className={index.toString()}>{arr[index]}</span>
                })
            }
        </>
    )
}