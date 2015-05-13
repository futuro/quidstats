GameSummaries = new Mongo.Collection("games");

Meteor.methods({

    /*=================================================
      Adds a new "Game" to the GameSummaries database
    ==================================================*/
	createGame: function (sessionName, teamName, roster) {
        // if (GameSummaries.findOne({session: {$eq: sessionName}})) {
        //     prompt("A session with that name already exists! Please enter a new name: ");
        //     return false;
        // }

        var id = GameSummaries.insert({
            session: sessionName,
            date: new Date(),
            team: teamName,
            quafflePlayers: [],
            snitchPlayers: [],
            players: roster
        });
        return id;
    },
    addQuafflePlayer: function(seshid, playername){
        GameSummaries.update({_id: seshid},
            {$addToSet: {quafflePlayers: {name: playername, score: 0}}});
    },
    addSnitchPlayer: function(seshid, playername){
        GameSummaries.update({_id: seshid},
            {$addToSet: {snitchPlayers: {name: playername, score: 0}}});
    },
    //incQuafflePlayer: function (seshid, name) {
    //    GameSummaries.update(({_id: seshid},
    //    {$inc: {quafflePlayers.name}}))
    //},

    /*==================================================
      Deletes all documents in GameSummaries collection
    ===================================================*/
    clearCollection: function() {
        //GameSummaries.remove({});
    },

    findGame: function(sName) {
        var game = GameSummaries.findOne();
        return game;
    }
});