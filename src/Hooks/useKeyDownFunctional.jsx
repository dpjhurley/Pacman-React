import { useState, useEffect } from 'react';
import Consts from '../Components/partials/Consts.jsx';

const useKeyDownFunctional = () => {
    const [pressedKeys, setPressedKeys] = useState([]);

    useEffect(() => {
        const onKeyDown = ({key}) => {
            console.log(key)
            // if (Consts.ALLOWED_KEYS.includes(key) && !pressedKeys.includes(key)) {
            //     setPressedKeys(previousPressedKeys => [...previousPressedKeys, key]);
            //     console.log(pressedKeys)
            // }
        }

        const onKeyUp = ({key}) => {
            // if (Consts.ALLOWED_KEYS.includes(key)) {
            //     setPressedKeys(previousPressedKeys => previousPressedKeys.filter(k => k !== key));
            // }
        }

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default useKeyDownFunctional;