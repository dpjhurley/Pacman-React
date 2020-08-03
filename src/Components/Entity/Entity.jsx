import React from 'react';

const Entity = ({
    type,
    xpos,
    ypos,
    TILE_SIZE
}) => {

    const EntityStyles = {
        left: xpos*TILE_SIZE+'px',
        top: ypos*TILE_SIZE + 'px'
    }

    return (  
        <div 
            className={`entity entity--${type}`}
            style={EntityStyles}
        >
        </div>
    );
}
 
export default Entity;
