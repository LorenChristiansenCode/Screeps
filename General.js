class General{
    constructor () {
        this.name='TonyStark';
        var captains={};
    }

    

   set(roomName,captain) {
        captains.push(roomName);
        captains[roomName]=captain
   }

   get(){
       return captains[roomName];
   }

   getCaptains(){
       return captains;
   }
    
}


module.exports = General;



