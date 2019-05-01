import store from '../../config/store';
import {SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH} from '../../config/constants';
export default function handleMovement(player){


    function getNewPosition(oldPos,direction){
       switch(direction){
            case 'West':
                return [oldPos[0]-SPRITE_SIZE,oldPos[1]]
            case 'East':
                return [oldPos[0]+SPRITE_SIZE,oldPos[1]]
            case 'North':
                return [oldPos[0],oldPos[1]-SPRITE_SIZE]
            case 'South':
                return [oldPos[0],oldPos[1]+SPRITE_SIZE]
            default:
                   return console.log("Huh?");
        }
        
    }

    function getSpriteLocation(direction,walkIndex){
        switch(direction){
            case 'East':
                return `walkeast ${walkIndex}`
            case 'West':
                return `walkwest ${walkIndex}`
            case 'North':
                return `walknorth ${walkIndex}`
            case 'South':
                return `walksouth ${walkIndex}`
            default:
                   return console.log("Huh?");
        }
    }

    function getWalkIndex(){
        const walkIndex = store.getState().player.walkIndex;
        return walkIndex >= 1 ?0:walkIndex+1;
    }

    function observeObstacles(oldPos,newPos){
        const tiles = store.getState().map.tiles;
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] /SPRITE_SIZE;
        const nextTile = tiles[y][x];
        return nextTile < 5;
    }

    function observeBoundaries(oldPos,newPos){
        return (newPos[0]>=0 && newPos[0] <= MAP_WIDTH-SPRITE_SIZE) &&
         (newPos[1]>=0 && newPos[1] <= MAP_HEIGHT-SPRITE_SIZE);
    }

    function directionMove(direction, newPos){
        const walkIndex = getWalkIndex();
       store.dispatch({
           type: 'MOVE_PLAYER',
           payload:{
               position:newPos,
                direction,
                walkIndex,
                spriteLocation:getSpriteLocation(direction,walkIndex)
           }
       }) 
    }

    function attemptMove(direction){
        const oldPos = store.getState().player.position;
        const newPos =getNewPosition(oldPos,direction);

        if(observeBoundaries(oldPos,newPos) && observeObstacles(oldPos,newPos) ){
            directionMove(direction,newPos);

        }
    }

    function handleKeyDown(e){
        switch(e.keyCode){
            case 37:
                return attemptMove("West");
            case 38:
                return attemptMove("North");
            case 39:
                return attemptMove("East");
            case 40:
                return attemptMove("South");
            default:
                console.log(e.keyCode);

        }
    }

    window.addEventListener('keydown',(e) => {
        e.preventDefault();
        handleKeyDown(e)
    })
    return player;
}