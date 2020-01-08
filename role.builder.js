/* TODO:
-Make builders repair working if there are no construction sites
-Make builders get resources from Spawn, not energy sources
*/


var roleUpgrader = require('role.upgrader');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
//logic to change working 
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
//Find construction sites
        if(creep.memory.working) {
            var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            if(targets.length != undefined) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } 
            //Upgrade controller if no construction sites
            else {
                roleUpgrader.run(creep);
            }
        }
//Fill with energy(from spawn if over 250)
        else {
            if (Game.spawns['StarkTower'].energy < 550){
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                }
            } else if(creep.withdraw(Game.spawns['StarkTower'],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.spawns['StarkTower']);
            }
        }
    }
};

module.exports = roleBuilder;