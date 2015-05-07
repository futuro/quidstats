GameSummaries = new Mongo.Collection("games");

Meteor.methods({
	createGame: function (sessionName, teamName, roster) {
        if (GameSummaries.findOne({session: {$eq: sessionName}})) {
            prompt("A session with that name already exists! Please enter a new name: ");
            return false;
        }

        GameSummaries.insert({
        	session: sessionName,
            date: new Date(),
            team: teamName,
            players: roster
        });
        return true;
    },

    clearCollection: function() {
        // deletes all entries
        GameSummaries.remove({});
    }

    // getGame: function(gameID) {
    // 	GameSummaries.find(_id: {$eq: gameID});
    // },

    // getGamePlayers: function(id) {
    // 	var game = getGame(id);
    // 	return game.players;
    // }
});