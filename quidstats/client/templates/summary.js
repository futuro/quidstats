Template.exportSummaryData.events({
	'click #exportData': function () {
		// send data somewhere
	}
});

Template.summary.helpers({
	// this isn't being used atm
    games: function (sname) {
        // We can use subscriptions if we want to split client and server
        // apart
        var gameSummary = Meteor.call('findGame', sname);
        return gameSummary['players'];
    }
});