import React, { useEffect, useRef, useState } from 'react'
import { Context } from '../context/context'
import { Banner } from './banner'
import { Display } from './wordsdisplay'

export const Test = () => {
    const [word, setWord] = useState('')
    const checking = useRef('')
    const [myTimer, setMyTimer] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [time, setTime] = useState(60)
    const [space, setSpace] = useState(0)
    const [banner, setBanner] = useState(false)
    const [mode, setMode] = useState(false)
    // assigning constants for result
    const [correctWords, setCorrectWords] = useState(0)
    const [wrongWords, setWrongWords] = useState(0)
    const [icon, setIcon] = useState(null)

    let root = document.documentElement

    const handlePress = event => {
        if (event.which === 32) {
            if (word === '' || word === null) {
                return
            } else {
                setSpace(space + 1)
            }
            setWord('')
            checking.current = word

        }
        console.log('rerender')
    }

    const hanleClicks = e => {
        setWord(e.target.value.trim())

        if (!myTimer && time > 0) {
            // the statement below returns true
            return setMyTimer(prev => !prev)
            
        }
    }

    useEffect(() => {
        if (myTimer && time > 0) {
            // decrease the time every second
            setTimeout(() => setTime(time - 1), 1000)
            

        } else if (myTimer && time === 0) {
            // set input field to false
            setBanner(prev => !prev)
            return setDisabled(prev => !prev)
        } else {
            return
        }
    }, [myTimer, time])

    useEffect(() => {
        if (mode) {
            root.style.setProperty('--shadow', '#ffffff10')
            root.style.setProperty('--neumorphBg', '#1b1b1b')
            root.style.setProperty('--opposeShadow', '#0f0f0f')
            root.style.setProperty('--spanBg', '#88888850')
            root.style.setProperty('--color', '#555')
            setIcon(prev => {
                return <svg className="night" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>
            })

        } else {
            root.style.setProperty('--shadow', '#ffffff')
            root.style.setProperty('--neumorphBg', '#E5E5E5')
            root.style.setProperty('--opposeShadow', '#00000080')
            root.style.setProperty('--spanBg', '#22222270')
            root.style.setProperty('--color', '#333')
            setIcon(prev => {
                return <svg className="day" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="moon-stars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M332.2 426.4c-93.1 17.7-178.5-53.7-178.5-147.7 0-54.2 29-104 76.1-130.8 7.3-4.1 5.4-15.1-2.8-16.7C108.7 109.4 0 200 0 320c0 106 85.8 192 191.8 192 59.2 0 113.2-26.9 149-71.1 5.3-6.5-.5-16.1-8.6-14.5zM304 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zm154.7 85.3L432 128l-26.7 53.3L352 208l53.3 26.7L432 288l26.7-53.3L512 208l-53.3-26.7z"></path></svg>                
            })
        }
    }, [mode])


    function refresh() {
        window.location.reload()
    }

    return (
        <Context.Provider value={{
            checking, space, setSpace, setWrongWords, setCorrectWords, correctWords, wrongWords
        }}>
            <div className="container test">
                <div className="box center">
                    {/* Box for words */}
                    <Display />
                </div>
                <div className="tools">
                    <input type="text" value={word} disabled={disabled} onChange={hanleClicks} onKeyPress={handlePress}/>
                    <div className="timer center">{time}s</div>
                    <button className="btn btn-start" onClick={refresh}>
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="redo-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M483.515 28.485L431.35 80.65C386.475 35.767 324.485 8 256.001 8 119.34 8 7.9 119.525 8 256.185 8.1 393.067 119.095 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.353-12.561.482-17.433l-19.738-19.738c-4.498-4.498-11.753-4.785-16.501-.552C351.787 433.246 306.105 452 256 452c-108.321 0-196-87.662-196-196 0-108.321 87.662-196 196-196 54.163 0 103.157 21.923 138.614 57.386l-54.128 54.129c-7.56 7.56-2.206 20.485 8.485 20.485H492c6.627 0 12-5.373 12-12V36.971c0-10.691-12.926-16.045-20.485-8.486z"></path></svg>
                    </button>
                    <button className="btn btn-mode" onClick={() => setMode(prev => !prev)}>
                        {icon}
                    </button>
                </div>
                {
                    banner && <Banner gatheredData={correctWords, wrongWords}/>
                }
            </div>
        </Context.Provider>
    )
}

