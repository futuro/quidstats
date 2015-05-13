Template.exportSummaryData.events({
	'click #exportData': function () {
		// send data somewhere
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