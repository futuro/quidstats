
Template.summary.helpers({
    games: function () {
        // We can use subscriptions if we want to split client and server
        // apart
        gameSummary = GameSummaries.findOne();
        return gameSummary['players'];
    }
});