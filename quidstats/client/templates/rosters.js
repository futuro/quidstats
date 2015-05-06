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

Template.teamroster.helpers({
    players: function () {
        return Teamrosters.findOne({name: this.name}, {fields: {players:1}}).players;
    }
});

Template.teamroster.events({
    'submit .new-players': function (event) {
        var playername = event.target.text.value;
        Meteor.call('insertPlayer', this.name, playername);
        event.target.text.value = '';
        return false;
    }
});