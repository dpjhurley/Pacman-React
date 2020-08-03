import React, { useState, useEffect } from 'react';
import useKey from '../../Hooks/useKey.jsx';

const Pacman = ({
    alive,
    position,
    score,
    gender,
    color,
    computeNewPosition,
    TILE_SIZE,
    updateCollision
}) => {
    const [ pacmanStyles, setPacmanStyles ] = useState({
        backgroundPositionY: '0%',
        backgroundPositionX: '0%',
        left:'0px',
        top:'0px',
    });
    const [ mouth, setMouth ] = useState(true);

    useEffect(() => {
        updatePosition();
    }, [position])

    useKey((k) => move(k));

    const updateAppearance = () => {
        if (alive) {
            `entity entity--pac pac${gender}-active-${color}`
        } else {
            'entity entity--tomb'
        }
    }

    const move = (key) => {
        if (alive) {
            updateFacing(key)
            updateMouth();
            updateCollision(computeNewPosition(key));
        }
    }

    const updateFacing = (direction) => {
        if (direction === 'ArrowRight') {
            setPacmanStyles(prevPacmanStyles => ({
                ...prevPacmanStyles,
                backgroundPositionY: '0%' 
            }));
        } else if (direction === 'ArrowLeft') {
            setPacmanStyles(prevPacmanStyles => ({
                ...prevPacmanStyles,
                backgroundPositionY: '33%' 
            }));        
        } else if (direction === 'ArrowDown') {
            setPacmanStyles(prevPacmanStyles => ({
                ...prevPacmanStyles,
                backgroundPositionY: '66%' 
            }));        
        } else if (direction === 'ArrowUp') {
            setPacmanStyles(prevPacmanStyles => ({
                ...prevPacmanStyles,
                backgroundPositionY: '100%' 
            }));
        }
    }

    const updateMouth = () => {
        if (mouth === true) {
            setPacmanStyles(prevPacmanStyles => ({
                ...prevPacmanStyles,
                backgroundPositionX: '100%' 
            }));
            setMouth(prevMouth => !prevMouth)
        } else if (mouth === false) {
            setPacmanStyles(prevPacmanStyles => ({
                ...prevPacmanStyles,
                backgroundPositionX: '0%' 
            }));
            setMouth(prevMouth => !prevMouth)
        }
    }

    const updatePosition = () => {
        if (alive === true) {
            setPacmanStyles(prevPacmanStyles => ({
                ...prevPacmanStyles,
                left: `${position.x * TILE_SIZE}px`,
                top: `${position.y * TILE_SIZE}px`,
            }))
        }
    }

    return (
        <div className={`entity entity--pac pac${gender}-active-${color}`} style={pacmanStyles} >
            <div>{`Total = ${score}`}</div>
        </div>
    )
}

export default Pacman;