/* TODO:
-Make upgraders get resources from Spawn, not energy sources
*/


var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //if they're full of energy working should be true
        //if they're empty then working should be false
        if(creep.carry.energy == creep.carryCapacity && creep.memory.working == false){
            creep.memory.working = true;
        }
        else if (creep.carry.energy == 0 && creep.memory.working == true){
            creep.memory.working = false;
        }
        

        if(!creep.memory.working) {
            if (Game.spawns['StarkTower'].energy < 550){
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                }
            } else if(creep.withdraw(Game.spawns['StarkTower'],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.spawns['StarkTower']);
                }
            }       
        else{
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;