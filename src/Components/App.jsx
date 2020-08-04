import React, { useState, useEffect } from 'react';
import Stage from './Stage/Stage.jsx';
import Const from './partials/Consts.jsx';

const App = () => {
    const [ entities, setEntities ] = useState([])
    const [ removed, setRemoved ] = useState(false)
    const [ entityArray, setEntityArray ] = useState([])

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

    const removeEntity = (entity, pos) => {
        for(let i = 0; i < entities[entity].length; i++) {
            if(entities[entity][i].x === pos.x && entities[entity][i].y === pos.y) {
                setEntities(prevEntities => {
                    const copyEntities = prevEntities;
                    copyEntities[entity].splice(i, 1)
                    return copyEntities;
                })
            }
        }
    }

    return (
        <div role="button" tabIndex="0">
            <Stage 
                entities={entities}
                TILE_SIZE={Const.TILE_SIZE}
                width={Const.width}
                height={Const.height}
                removeEntity={removeEntity}
            />
        </div>
    );
}
 
export default App;