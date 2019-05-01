import React from 'react';
import {connect} from 'react-redux';
import walkeast1 from './dog/Walk10.png';
import walkeast2 from './dog/Walk4.png';
import walkwest1 from './dog/Walk9.png';
import walkwest2 from './dog/Walk5.png';
import walknorth from './dog/Fall1.png';
import walksouth from './dog/Slide4.png';
import handleMovement from './movement';

function Player(props){

    let sprite = "";
    switch(props.spriteLocation){
        case 'walkeast 0':
            sprite = walkeast1;
            break;
        case 'walkeast 1':
            sprite = walkeast2;
            break;
        case 'walkwest 0':
            sprite = walkwest1;
            break;
        case 'walkwest 1':
            sprite = walkwest2;
            break;
        case 'walknorth 0':
            sprite = walknorth;
            break;
        case 'walksouth 0':
            sprite = walksouth;
            break;
        default:
            sprite = walkeast1;
    }
    return (
        <div style={{
           position:'absolute',
            top: props.position[1],
            left: props.position[0],
            backgroundImage: `url('${sprite}')`,
           // backgroundPosition:props.spriteLocation,
            width: '40px',
            height: '40px'
        }}
        >
       </div>
    )
}

function mapStateToProps(state){
    return {
        ...state.player
    }
}

export default connect(mapStateToProps)(handleMovement(Player));