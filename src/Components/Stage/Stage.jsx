import React, { useState, useEffect } from 'react';
import Entity from '../Entity/Entity.jsx';
import Pacman from '../Pacman/Pacman.jsx';

const Stage = ({
    entities,
    TILE_SIZE,
    width,
    height,
    removeEntity
}) => {
    const [ position, setPosition ] = useState({x: 0, y:0});
    const [ color, setColor ] = useState('light');
    const [ gender, setGender ] = useState('boy');
    const [ score, setScore ] = useState(0);
    const [ alive, setAlive ] = useState(true);

    const stageStyles = {
        height: height * TILE_SIZE + 'px',
        width: width * TILE_SIZE + 'px'
    }

    const computeNewPosition = (direction) => {
        if (direction === 'ArrowRight' ) {
            return {x: position.x + 1, y: position.y}
        } else if (direction === 'ArrowLeft') {
            return {x: position.x - 1, y: position.y}
        } else if (direction === 'ArrowDown') {
            return {x: position.x, y: position.y + 1}
        } else if (direction === 'ArrowUp') {
            return {x: position.x, y: position.y - 1}
        }
    }

    const withinBorders = (x, y) => {
        if (x >= width || y >= height) {
            return false;
        } 
        if (x < 0 || y < 0) {
            return false;
        }
        return true;
    }

    const updateCollision = (newPos) => {
        const { apples, bombs, walls } = entities;
        if (!withinBorders(newPos.x, newPos.y)) {
            setPosition(prevPosition => ({
                ...prevPosition
            }));
        } else if (apples.some(entity => (entity.x === newPos.x && entity.y === newPos.y))) {
            setPosition(prevPosition => ({
                ...prevPosition,
                x: newPos.x,
                y: newPos.y
            }));
            setScore(prevScore => (prevScore + 1))
            removeEntity('apples', {x: newPos.x, y: newPos.y});
        } else if (bombs.some(entity => (entity.x === newPos.x && entity.y === newPos.y))) {
            setPosition(prevPosition => ({
                ...prevPosition,
                x: newPos.x,
                y: newPos.y
            }));
            removeEntity('bombs', {x: newPos.x, y: newPos.y});
        }else if (walls.some(entity => (entity.x === newPos.x && entity.y === newPos.y))) {
            setPosition(prevPosition => ({
                ...prevPosition
            }));
        } else {
            setPosition(prevPosition => ({
                ...prevPosition,
                x: newPos.x,
                y: newPos.y
            }));
        }
    }

    // const collisionDetection = (x, y) => {
    //     for (let i = 0; i < this.entityArray.length; i ++) {
    //       if (this.entityArray[i].xpos === x *TILE_SIZE && this.entityArray[i].ypos === y * TILE_SIZE) {
    //         return this.entityArray[i];
    //       }
    //     }
    //     return null; 
    // }

    return (  
        <div className='stage' style={stageStyles}>
            <Pacman 
                position={position}
                score={score}
                gender={gender}
                color={color}
                alive={alive}
                computeNewPosition={computeNewPosition}
                TILE_SIZE={TILE_SIZE}
                width={width}
                height={height}
                updateCollision={updateCollision}
            />
            {entities ? (
                    Object.keys(entities).map((keyname) => (
                        entities[keyname].map((e, i) => (
                            <Entity 
                                key={i}
                                type={keyname}
                                xpos={e.x}
                                ypos={e.y}
                                TILE_SIZE={TILE_SIZE}
                            />
                        ))
                    ))
                ) : (
                    <div>loading</div>
                )
            }
        </div>
    );
}
 
export default Stage;