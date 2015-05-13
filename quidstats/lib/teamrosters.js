Teamrosters = new Mongo.Collection("teamrosters");

Meteor.methods({
    createTeam: function (name) {
        check(name, String);
        var id = Teamrosters.insert({
            name: name,
            createdAt: new Date(),
            players : []
        });
        return id;
    },
    insertPlayer: function (teamname, player) {
        check(teamname, String);
        check(player, String);
        Teamrosters.update({name: teamname}, {$addToSet: {players: {playerName: player}}});
    },
    getTeams: function () {
        return Teamrosters.find();
    }
});

// If we want to have a server/client dichotomy, we need to turn off the
// autopublish plugin, then publish the teamrosters collection and have the clients
// subscribe to them
//if (Meteor.isServer) {
//    Meteor.publish("teamrosters", function () {
//        return Teamrosters.find();
//    })
//}