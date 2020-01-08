class Creep{
    constructor (creep,Room) {
        this.name=this.creep.name
        this.Role=undefined;
        this.isWorking=undefined;
        this.currentRoom=this.creep.room;
        this.targetRoom=undefined;
    }
    
    harvest() {}
    upgrade() {}
    build() {}
    repair(repairWalls) {}
    attack() {}
    defend() {}

}


module.exports = Creep;



