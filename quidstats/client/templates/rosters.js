Template.rosters.addTeam = function (name) {
    Teams.insert({
        name:name,
        createdAt: new Date()
    })
};
Template.rosters.events({
    'submit .new-roster': function(event){
        var teamname = event.target.text.value;
        //Meteor.call("addTeam", name);
        //Template.rosters.addTeam(name);
        Meteor.call("createTeam", teamname);
        event.target.text.value = "";
        return false;
    }
});
Template.rosters.helpers({
    teams: function () {
        // We can use subscriptions if we want to split client and server
        // apart
        return Teamrosters.find();
    }
});