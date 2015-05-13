Template.oldgames.helpers({
    games: function () {
        return GameSummaries.find();
    }
});

Template.oldGamesList.events({
    'click .oldGame': function (e) {
        var gameid = e.currentTarget.attributes.id.value;
        Session.set('currGameId', gameid);
    }
});