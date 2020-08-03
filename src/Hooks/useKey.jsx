import { useState, useEffect, useRef } from 'react';
import Consts from '../Components/partials/Consts.jsx';


const useKey = (cb) => {
    const [ pressed, setPressed ] = useState([]);
    const callBackRef = useRef(cb);

    useEffect(() => {
        callBackRef.current = cb
    })

    useEffect(() => {
        const handleKeyDown = ({key}) => {
            if (Consts.ALLOWED_KEYS.includes(key) && !pressed.includes(key)) {
                callBackRef.current(key)
                setPressed(prevPressed => [...prevPressed, key])
            }
        }

        const handleKeyUp = ({key}) => {
            if (Consts.ALLOWED_KEYS.includes(key)) {
                setPressed([])
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("keyup", handleKeyUp)
        }
    }, [])
}
 
export default useKey;