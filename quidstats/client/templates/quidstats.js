// Teams db has "name" : [players]
// Teams = new Mongo.Collection("teams");
// Games has date : <date>,  team : <string>
// players : {playerName : {quaffle : <int>, snitch: <int>}, playerName: {..}}}
// Games = new Mongo.Collection("games");

Template.quafflePlayers.helpers({
    quafflePlayers: function(){
        return GameSummaries.find({}, {fields: {quafflePlayers:1}});
    }
});

Template.snitchPlayers.helpers({
    snitchPlayers: function () {
        return GameSummaries.find({}, {fields: {snitchPlayers:1}});
    }
});

Template.quidstats.helpers({
    printsesh: function () {
        var seshid = Session.get('currSeshId');
        console.log(seshid);
        return seshid;
    }
});

if (Meteor.isClient) {

  /*=============================================
    Player Object Constructors
    - prolly don't need this shit?
  ==============================================*/
  function Player(name) {
    this.name = name;
    this.quafflePoints = 0;
    this.snitchGrabs = 0;
    this.quaffleDisplay = false;
    this.snitchDisplay = false;
  }

  function Player(name, ball) {
    this.name = name;
    this.quafflePoints = 0;
    this.snitchGrabs = 0;
    this.quaffleDisplay = false;
    this.snitchDisplay = false;

    if (ball == "snitch") {
      this.snitchDisplay = true;
    }
    else if (ball == "quaffle") {
      this.quaffleDisplay = true;
    }
  }

  /*=============================================
    Add New Quaffle Player
  ==============================================*/
  Template.addNewQuafflePlayer.events({
    'click .addQuafflePlayer': function () {
      var name = prompt("New Player Name: ");
      newPlayer(name, "quaffle");
    }
  });

  /*=============================================
    Add New Snitch Player
  ==============================================*/
  Template.addNewSnitchPlayer.events({
    'click .addSnitchPlayer': function () {
      var name = prompt("New Player Name: ");
      newPlayer(name, "snitch");
    }
  });

  /*=============================================
    Go To Summary Page
  ==============================================*/

  Template.goToSummary.helpers({
    redirectToSummary: function(a) {
      // TODO: update this shit somehow
      Meteor.call('clearCollection');
      Meteor.call('createGame', a, a, playerList);
    }

  });

  /*=============================================
    Increment Quaffle Points
  ==============================================*/
  Template.quafflePlayers.events({
    'click .increment': function (e) {
      // TODO: might be a better/more secure way to get the player name
      var name = e.currentTarget.parentNode.querySelector('.name').innerHTML;
      incrementPlayer(name, "quaffle");
    }
  });


  /*=============================================
    Increment Snitch Grabs
  ==============================================*/
  Template.snitchPlayers.events({
    'click .increment': function (e) {
      // TODO: might be a better/more secure way to get the player name
      var name = e.currentTarget.parentNode.querySelector('.name').innerHTML;
      incrementPlayer(name, "snitch");
    }
  });

  /*=============================================
    FUNCTIONS
  ==============================================*/
  function newPlayer(name, ball) {
    // if user presses "cancel" on name entry
    if (name == null) {
      return;
    }

    // TODO:
    // if player name ! in db, add them
    // else tell user they're a dumbass
  }

  function incrementPlayer(name, ball) {
    // TODO:
    // increment user stat (of ball) in db
  }

  function displayQuafflePlayers() {
    // document.getElementById("quafflePlayerList").innerHTML = ""; // this didn't work, maybe
    // remove all names (fresh start)
    var div = document.getElementById("quafflePlayerList");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    playerList.forEach(function(entry) {
      if (entry.quaffleDisplay) {
        var elem = document.createElement("div");
        elem.className = "player";
        elem.innerHTML = "<p class=\"name\">" + entry.name + "</p>" 
                        + quaffleIncrement 
                        + "<p class=\"points\">" +entry.quafflePoints; + "</p>";
        document.getElementById("quafflePlayerList").appendChild(elem);
      }
    });
  }

  function displaySnitchPlayers() {
    // document.getElementById("snitchPlayerList").innerHTML = "";
    var div = document.getElementById("snitchPlayerList");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    playerList.forEach(function(entry) {
      if (entry.snitchDisplay) {
        var elem = document.createElement("div");
        elem.className = "player";
        elem.innerHTML = "<p class=\"name\">" + entry.name + "</p>" 
                        + snitchIncrement 
                        + "<p class=\"points\">" +entry.snitchGrabs; + "</p>";
        document.getElementById("snitchPlayerList").appendChild(elem);
      }
    });
  }
}