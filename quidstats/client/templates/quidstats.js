
// These could be consolidated into a general template helper function
Template.quafflePlayers.helpers({
    quafflePlayersList: function(){
        var gameid = Session.get('currGameId');
        return GameSummaries.find({"_id":gameid}, {fields: {players:1}});
    }
});

Template.snitchPlayers.helpers({
    snitchPlayersList: function () {
        var gameid = Session.get('currGameId');
        return GameSummaries.find({"_id":gameid}, {fields: {players:1}});
    }
});

Template.quidstats.helpers({
    printsesh: function () {
        var gameid = Session.get('currGameId');
        console.log(gameid);
        return gameid;
    },

    teamName: function() {
        return Session.get('teamName');
    }
});



/*=============================================
 Increment Quaffle Points
 ==============================================*/
Template.quafflePlayers.events({
    'click .quafflePnt': function (e) {
        var name = e.currentTarget.attributes.id.value,
            gameid = Session.get('currGameId');
        Meteor.call('incQuafflePlayer', gameid, name);
    }
});


/*=============================================
 Increment Snitch Grabs
 ==============================================*/
Template.snitchPlayers.events({
    'click .snitchPnt': function (e) {
        var name = e.currentTarget.attributes.id.value,
            gameid = Session.get('currGameId');
        Meteor.call('incSnitchPlayer', gameid, name);
    }
});

/*=============================================
 Add New Quaffle Player
 ==============================================*/
Template.addNewQuafflePlayer.events({
    'click .addQuafflePlayer': function () {
        Session.set('currPlayerType', 'quaffle');
        playerPrompt();
    }
});

Template.playerSelect.events({
    'click .playerName': function (e) {
        var name = e.currentTarget.attributes.id.value,
            gameid = Session.get('currGameId'),
            playerType = Session.get('currPlayerType');
        if (playerType === 'quaffle') {
            Meteor.call('addQuafflePlayer', gameid, name);
        } else if (playerType === 'snitch'){
            Meteor.call('addSnitchPlayer', gameid, name);
        }
        Session.set('currPlayerType', '');
        $('.modal').modal('hide');
    }
});

Template.playerSelect.helpers({
    playersList: function(){
        var gameid = Session.get('currGameId');
        return GameSummaries.find({"_id":gameid}, {fields: {players:1}});
    }
});

function playerPrompt() {
    BootstrapModalPrompt.prompt({
        btnDismissText: 'Cancel',
        btnOkText: false,
        title: 'Select a player to add',
        template: Template.playerSelect
    })
}
/*=============================================
 Add New Snitch Player
 ==============================================*/
Template.addNewSnitchPlayer.events({
    'click .addSnitchPlayer': function () {
        Session.set('currPlayerType', 'snitch');
        playerPrompt();
    }
});
