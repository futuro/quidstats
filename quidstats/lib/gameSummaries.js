GameSummaries = new Mongo.Collection("games");

Meteor.methods({

    /*=================================================
      Adds a new "Game" to the GameSummaries database
    ==================================================*/
	createGame: function (sessionName, teamName, date) {
        var roster = Teamrosters.findOne({name:teamName}, {fields:{players:1}}).players;
        var extPlayer = function(player){
            return _.extend(
                {quafflePoints:0, displayQuaffle:false, snitchPoints:0, displaySnitch:false},
                player)
        };
        var players = _.map(roster, extPlayer);
        var id = GameSummaries.insert({
            session: sessionName,
            date: date,
            team: teamName,
            players: players
        });
        return id;
    },
    addQuafflePlayer: function(gameid, playerName){
        GameSummaries.update({$and:[{_id: gameid},{'players.playerName':playerName}]},
            {$set: {'players.$.displayQuaffle': true}});
    },
    addSnitchPlayer: function(gameid, playerName){
        GameSummaries.update({$and:[{_id: gameid},{'players.playerName':playerName}]},
            {$set: {'players.$.displaySnitch': true}});
    },
    incQuafflePlayer: function (gameid, name) {
        GameSummaries.update({$and:[{_id: gameid},{'players.playerName':name}]},
            {$inc: {'players.$.quafflePoints':10}});
    },
    incSnitchPlayer: function (gameid, name) {
        GameSummaries.update({$and:[{_id: gameid},{'players.playerName':name}]},
            {$inc: {'players.$.snitchPoints':30}});
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