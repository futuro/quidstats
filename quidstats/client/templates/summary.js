Template.exportSummaryData.events({
	'click #exportData': function () {
		// send data somewhere
	}
});

Template.summary.helpers({
    players: function () {
        var currentGameId = Session.get("currGameId");
        var game = GameSummaries.findOne({ _id : currentGameId});
        return
    },

    teamName: function () {
        return Session.get('teamName');
    }
});