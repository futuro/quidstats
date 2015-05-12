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
        var teamname = event.target.textContent.trim(),
            date = new Date();
        Meteor.call('createGame', date, teamname, [],
            function (error, result) {
                if (error) {
                    console.log(error);
                    Session.set('currSeshId', "Couldn't set sesh id")
                } else {
                    Session.set('currSeshId', result);
                }
            }
        );
    }
});