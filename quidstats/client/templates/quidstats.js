// Teams db has "name" : [players]
Teams = new Mongo.Collection("teams");
// Games has date : <date>,  team : <string>
// players : {playerName : {quaffle : <int>, snitch: <int>}, playerName: {..}}}
Games = new Mongo.Collection("games");


if (Meteor.isClient) {
  //Meteor.subscribe("teams");
  var quaffleIncrement = "<button class=\"increment\">+10</button>";
  var snitchIncrement = "<button class=\"increment\">+30</button>";

  var playerList = new Array();
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

  Template.addNewQuafflePlayer.events({
    'click .addQuafflePlayer': function () {
      var name = prompt("New Player Name: ");
      newPlayer(name, "quaffle");
      displayQuafflePlayers();
    }
  });

  Template.addNewSnitchPlayer.events({
    'click .addSnitchPlayer': function () {
      var name = prompt("New Player Name: ");
      newPlayer(name, "snitch");
      displaySnitchPlayers();
    }
  });

  Template.quafflePlayers.events({
    'click .increment': function (e) {
      var name = e.currentTarget.parentNode.querySelector('.name').innerHTML;
      
      incrementPlayer(name, "quaffle");
      displayQuafflePlayers();
    }
  });

  Template.snitchPlayers.events({
    'click .increment': function (e) {
      var name = e.currentTarget.parentNode.querySelector('.name').innerHTML;
      
      incrementPlayer(name, "snitch");
      displaySnitchPlayers();
    }
  });

  function newPlayer(name, ball) {
    // if user presses "cancel" on name entry
    if (name == null) {
      return;
    }

    var match = false;
    playerList.forEach(function(entry) {
      // need error message if player tries to add player that exists in list already
      if (name == entry.name) {
        match = true;
        if (ball == "quaffle") {
          entry.quaffleDisplay = true;
        }
        else if (ball == "snitch") {
          entry.snitchDisplay = true;
        }
        return;
      }
    });

    if (!match) {
      var newPlayer = new Player(name, ball);
      playerList.push(newPlayer);
    }
  }

  function incrementPlayer(name, ball) {
    playerList.forEach(function(entry) {
      if (name == entry.name) {
        if (ball == "quaffle") {
          entry.quafflePoints += 10;
        }
        else if (ball == "snitch") {
          entry.snitchGrabs += 1;
        }
        return;
      }
    });
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

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}