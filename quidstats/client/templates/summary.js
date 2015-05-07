Template.exportSummaryData.events({
	'click #exportData': function () {
		// send data somewhere
	}
});

Template.summary.helpers({
	// this isn't being used atm
    games: function () {
        // We can use subscriptions if we want to split client and server
        // apart
        gameSummary = GameSummaries.findOne();
        return gameSummary['players'];
    }
});