import React, { useState, useEffect } from 'react';
import Stage from './Stage/Stage.jsx';
import Const from './partials/Consts.jsx';

const App = () => {
    const [ entities, setEntities ] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const resp = await fetch(`http://bootcamp.podlomar.org/api/pacman?width=${Const.width}&height=${Const.height}`)
        const results = await resp.json()
        if (results) {
            setEntities(results)
        } 
    } 

    return (
        <div role="button" tabIndex="0">
            <Stage 
                entities={entities}
                TILE_SIZE={Const.TILE_SIZE}
                width={Const.width}
                height={Const.height}
            />
        </div>
    );
}
 
export default App;