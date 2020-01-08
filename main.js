/*
TODO:
-Wallrepairerspawning
*/

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairman = require('role.repairman');
var roleWallRepairman = require('role.wallRepairman');
//var Room = require('Room');

module.exports.loop = function() {


// for(var n in Game.rooms) {
//     var theRoom = new Room(Game.rooms[n]);
//     theRoom.getCreeps();
// }

//Clear memory of dead creeps
for (let name in Memory.creeps){
    if (Game.creeps[name] == undefined) {
        delete Memory.creeps[name];
    }
}
   
//Get number of creeps in each role
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairman');
    var wallRepairmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepairman');
    

//Set minimum numbers for each role 
    let minHarvesters = 3;
    let minUpgraders = 3;
    let minBuilders = 3;
    let minRepairmen = 1;
    let minWallRepairmen = 1;

    let success;

//Create Creeps if amount <> minimum
    if(harvesters.length < minHarvesters) {
        var harvesterName = 'Harvester' + Game.time;
        success = Game.spawns['StarkTower'].spawnCreep([WORK,WORK,WORK,WORK,WORK
                                                        ,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY//,CARRY,CARRY,CARRY,CARRY
                                                        ,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE//,MOVE
                                                        ]
                                                        , harvesterName,
        //success = Game.spawns['StarkTower'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], harvesterName,
            {memory: {role: 'harvester'
                      ,working: false}});
        if (!(success<0)){
         console.log('Spawning new Harvester: ' + harvesterName);
        }   
    }
    else if(upgraders.length < minUpgraders) {
        var upgraderName = 'Upgrader' + Game.time;
        success = Game.spawns['StarkTower'].spawnCreep([WORK,WORK,WORK,WORK,WORK
                                                        ,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY//,CARRY,CARRY,CARRY,CARRY
                                                        ,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE//,MOVE
                                                        ]
                                                        , upgraderName,
        //success = Game.spawns['StarkTower'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], upgraderName,
        //success = Game.spawns['StarkTower'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], upgraderName,
            {memory: {role: 'upgrader'
            ,working: false}});
        if (!(success<0)){
            console.log('Spawning new Upgrader: ' + upgraderName);
               }   
    }
    else if(builders.length < minBuilders) {
        var builderName = 'Builder' + Game.time;
        success = Game.spawns['StarkTower'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], builderName,
        //success = Game.spawns['StarkTower'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], builderName,
        //success = Game.spawns['StarkTower'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], builderName,
            {memory: {role: 'builder'
            ,working: false}});
        if (!(success<0)){
            console.log('Spawning new Builder: ' + builderName);
            }   
    }
    else if(repairmen.length < minRepairmen) {
        var repairmanName = 'Repairman' + Game.time;
        success = Game.spawns['StarkTower'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], repairmanName,
            {memory: {role: 'repairman'
            ,working: false}});
        if (!(success<0)){
            console.log('Spawning new Repairman: ' + repairmanName);
            }   
    }
    else if(wallRepairmen.length < minWallRepairmen) {
        var wallRepairmanName = 'WallRepairman' + Game.time;
        success = Game.spawns['StarkTower'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], wallRepairmanName,
            {memory: {role: 'wallrepairman'
            ,working: false}});
        if (!(success<0)){
            console.log('Spawning new Wall Repairman: ' + wallRepairmanName);
            }   
    }

//Visual Notification that the StarkTower is spawning
    if(Game.spawns['StarkTower'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['StarkTower'].spawning.name];
        Game.spawns['StarkTower'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['StarkTower'].pos.x,
            Game.spawns['StarkTower'].pos.y + 1,
            {align: 'left', opacity: 0.8});
    }

//Screep behavior by role
    for(var name in Game.creeps){
        var creep = Game.creeps[name];

        //harvester
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        //upgrader
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        //builder
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        //repairman
        if(creep.memory.role == 'repairman'){
            roleRepairman.run(creep);
        }
        if(creep.memory.role == 'wallrepairman'){
            roleWallRepairman.run(creep);
        }
    }

//Tower Defense Code
    var theTowers = Game.rooms.E15N32.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of theTowers) {
        var targetAttack = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (targetAttack != undefined) {
            tower.attack(targetAttack);
        }
    }
    //Reparing nearby buildings 
    for (let tower of theTowers) {
        var targetRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
        });
        if (targetRepair != undefined) {
            tower.repair(targetRepair);
        }
    }


}