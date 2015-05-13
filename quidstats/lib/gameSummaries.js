GameSummaries = new Mongo.Collection("games");

Meteor.methods({

    /*=================================================
      Adds a new "Game" to the GameSummaries database
    ==================================================*/
	createGame: function (sessionName, teamName, date) {
        // if (GameSummaries.findOne({session: {$eq: sessionName}})) {
        //     prompt("A session with that name already exists! Please enter a new name: ");
        //     return false;
        // }

        var id = GameSummaries.insert({
            session: sessionName,
            date: date,
            team: teamName,
            quafflePlayers: [],
            snitchPlayers: []
        });
        return id;
    },
    addQuafflePlayer: function(gameid, playername){
        GameSummaries.update({_id: gameid},
            {$addToSet: {quafflePlayers: {name: playername, score: 0}}});
    },
    addSnitchPlayer: function(gameid, playername){
        GameSummaries.update({_id: gameid},
            {$addToSet: {snitchPlayers: {name: playername, score: 0}}});
    },
    incQuafflePlayer: function (gameid, name) {
        GameSummaries.update({$and:[{_id: gameid},{'quafflePlayers.name':name}]},
            {$inc: {'quafflePlayers.$.score':10}});
    },
    incSnitchPlayer: function (gameid, name) {
        GameSummaries.update({$and:[{_id: gameid},{'snitchPlayers.name':name}]},
            {$inc: {'snitchPlayers.$.score':30}});
    },

    /*==================================================
      Deletes all documents in GameSummaries collection
    ===================================================*/
    clearCollections: function() {
        GameSummaries.remove({});
        Teamrosters.remove({});
    },

    findGame: function(sName) {
        var game = GameSummaries.findOne();
        return game;
    }
});