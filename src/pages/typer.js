import React, { useEffect } from 'react'
import useInput from '../hooks/useInput'
import WordsList from '../components/wordsList'
import { useDispatch, useSelector } from 'react-redux'
import { changePage, dropSpaceNumber, generateRandomNumbers, increaseKeyboardHitNumber, increaseSpacePressed, toggleTest } from '../redux/typer'

const icon = <svg className="night" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>

const Typer = () => {

    const dispatch = useDispatch()
    const isStarted = useSelector(state => state.typer.isStarted)
    const focusWord = useSelector(state => state.typer.focusWord)
    const space = useSelector(state => state.typer.spacePressed)

    const currentWord = useInput('')
    const handlePress = e => {
        e.which !== 13 && dispatch(increaseKeyboardHitNumber())
        // if 'SPACE' button is pressed clear the input
        e.which === 32 && handleSpaceBarEvents()
    }

    useEffect(() => {
        window.addEventListener('keypress', (e) => toggleTestStartStop(e))

        function toggleTestStartStop(e) {
            if (e.charCode === 13 && isStarted === false) {
                dispatch(toggleTest(true))
                document.querySelector('#inputSpace').focus()
            } else if (e.charCode === 13 && isStarted === true) {
                console.log('end test')
                dispatch(toggleTest(false))
            }
        }

        return () => {
            window.removeEventListener('keypress', toggleTestStartStop())
        }
    }, [])

    function handleSpaceBarEvents() {
        // check if input word is not empty
        if (currentWord.value.trim()) {
            if (currentWord.value.trim() === focusWord.innerText) {
                currentWord.setValue('')
                focusWord.classList.add('correct')
                focusWord.classList.remove('active')

                if (space !== 0 && space % 28 === 0) {
                    dispatch(changePage())
                    dispatch(dropSpaceNumber())
                    dispatch(generateRandomNumbers(30))
                }
            }
            if (currentWord.value.trim() !== focusWord.innerText) {
                currentWord.setValue('')
                focusWord.classList.add('wrong')
                focusWord.classList.remove('active')

                if (space !== 0 && space % 28 === 0) {
                    dispatch(changePage())
                    dispatch(dropSpaceNumber())
                    dispatch(generateRandomNumbers(30))
                }
            }
            dispatch(increaseSpacePressed())
        }
        currentWord.setValue('')
        // if (space !== 0 && space % 28 === 0) {
        //     dispatch(changePage())
        //     dispatch(dropSpaceNumber())
        //     dispatch(generateRandomNumbers(30))
        // }
    }

    console.log(space)

    return (
        <div className="container test">
            <div className="box center">
                {/* Box for words */}
                <WordsList />
            </div>
            <div className="tools">
                <input
                    type="text"
                    id="inputSpace"
                    value={currentWord.value}
                    onChange={currentWord.onChange}
                    disabled={!isStarted}
                    onKeyPress={e => handlePress(e)}
                />
                <div className="timer center">60s</div>
                <button className="btn btn-start">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="redo-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M483.515 28.485L431.35 80.65C386.475 35.767 324.485 8 256.001 8 119.34 8 7.9 119.525 8 256.185 8.1 393.067 119.095 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.353-12.561.482-17.433l-19.738-19.738c-4.498-4.498-11.753-4.785-16.501-.552C351.787 433.246 306.105 452 256 452c-108.321 0-196-87.662-196-196 0-108.321 87.662-196 196-196 54.163 0 103.157 21.923 138.614 57.386l-54.128 54.129c-7.56 7.56-2.206 20.485 8.485 20.485H492c6.627 0 12-5.373 12-12V36.971c0-10.691-12.926-16.045-20.485-8.486z"></path></svg>
                </button>
                <button className="btn btn-mode">
                    {icon}
                </button>
            </div>
            {/* {
                banner && <Banner gatheredData={correctWords, wrongWords} />
            } */}
        </div>
    )
}

export default React.memo(Typer)