class Captain{
    constructor (room) {
        this.room=room;
        this.sites=this.room.find(FIND_MY_CONSTRUCTION_SITES);
        this.sources=this.room.find(FIND_SOURCES);
        this.totalAvailableEnergy=
        this.controller=this.room.controller;
        this.roomToAttack=undefined;
        this.callingForReinforcements=false;
        this.isUnderAttack=false;
        this.safeModeAvailable=this.room.safeModeAvailable;
        //this.creepBalance={};
        //this.roomLevel=
    }


    activateSafeMode() {}
    callForReinforcements() {}
    generateScreeps() {}
    attackRoom(){}
    defendRoom(){}
    
}


module.exports = Captain;



