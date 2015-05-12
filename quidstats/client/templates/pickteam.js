Template.pickteam.helpers({
    teams: function () {
        // We can use subscriptions if we want to split client and server
        // apart
        return Teamrosters.find();
    }
});

Template.newgamelist.events({
    'click .newgame': function (event) {
        console.log(event);
        var teamname = event.target.textContent;
        Meteor.call('createGame', new Date(), teamname, []);
    }
})