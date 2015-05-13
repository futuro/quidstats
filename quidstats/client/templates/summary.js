Template.exportSummaryData.events({
	'click #exportData': function () {
		var gameid = Session.get('currGameId'),
            game = GameSummaries.findOne({_id:gameid}),
            results = game.players,
            csv = Papa.unparse(results),
            spaces=/ /g,
            colons=/:/g,
            filename = game.session.replace(spaces,'_').replace(colons,'-') + '.csv',
            blob = new Blob([csv], {type: "text/plain;charset=utf-8"});

        saveAs(blob, filename);
	}
});

Template.summary.helpers({
	// this isn't being used atm
    playerList: function () {
        // We can use subscriptions if we want to split client and server
        // apart
        var gameid = Session.get('currGameId');
        return GameSummaries.find({_id:gameid}, {fields: {players:1}});
    },

    teamName: function () {
        return Session.get('teamName');
    }
});