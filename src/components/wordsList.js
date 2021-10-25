import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { generateRandomNumbers, setFocusWord } from '../redux/typer'
import { Top200 } from '../words/top200'

const WordsList = () => {

    const dispatch = useDispatch()
    const isStarted = useSelector(state => state.typer.isStarted)
    const space = useSelector(state => state.typer.spacePressed)
    const randomNumbers = useSelector(state => state.typer.randomNumbers)
    const page = useSelector(state => state.typer.page)
    const numberOfWordsToDisplay = 30

    useEffect(() => {
        dispatch(generateRandomNumbers(numberOfWordsToDisplay))
    }, [])

    const highlightCurrentWord = useCallback(() => {
        if (isStarted) {
            const currentWord1 = document.getElementById('word'+`${page}${space}`)
            currentWord1.classList.add('active')
            dispatch(setFocusWord(currentWord1))
        }
    }, [space, randomNumbers, isStarted])

    highlightCurrentWord()

    return (
        <div className="list">
            {
                randomNumbers.length && randomNumbers.map((number, index) => {
                    return (
                        <span key={index} id={`word${page}${index}`}>
                            {Top200[number]}
                        </span>
                    )
                })
            }
        </div>
    )
}

export default React.memo(WordsList)