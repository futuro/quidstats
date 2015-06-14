Template.pickteam.helpers({
    teams: function () {
        // We can use subscriptions if we want to split client and server
        // apart
        return Teamrosters.find();
    }
});

Template.newgamelist.events({
    'click .newgame': function (event) {
        Session.set('teamName', event.target.textContent.trim());
    }
});