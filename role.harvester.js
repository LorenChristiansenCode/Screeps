/* TODO:
-Somehow need to make Harvesters move extra energy to the extensions maybe? They're doing a lot of sitting around...
-MAKE MEGA CREEPS
*/

var roleHarvester = {
  /** @param {Creep} creep **/
  run: function(creep) {
    //If the creep is working and energy is 0, we should switch to not working
    //if the creep is full, should switch to working
    if (creep.memory.working == true && creep.carry.energy == 0) {
      creep.memory.working = false;
    }
    if (
      creep.memory.working == false &&
      creep.carry.energy == creep.carryCapacity
    ) {
      creep.memory.working = true;
    }
    //If creep is working(transfering energy to structure)
    if (creep.memory.working) {
      // find closest spawn or extension which is not full
      var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: s => s.energy < s.energyCapacity
      });
      // if we found one
      if (structure != undefined) {
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      }
    }
    //Otherwise, gather from a source
    else {
      // find closest source
      var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      // try to harvest energy, if the source is not in range
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        // move towards the source
        creep.moveTo(source);
      }
    }
  }
};

module.exports = roleHarvester;
