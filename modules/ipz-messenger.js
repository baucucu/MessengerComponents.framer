var IpzMessenger, ios, ipz,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ios = require("ios-kit");

ipz = require("ipz-messenger-kit");

IpzMessenger = (function(superClass) {
  extend(IpzMessenger, superClass);

  function IpzMessenger(options, user) {
    var callsTab, callsView, camView, cameraTab, gamesTab, gamesView, homeTab, homeView, peopleTab, peopleView, tabBar;
    if (options == null) {
      options = {};
    }
    if (options.name == null) {
      options.name = "Messenger.Main";
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.height == null) {
      options.height = Screen.height;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = Screen.backgroundColor;
    }
    IpzMessenger.__super__.constructor.call(this, options);
    homeTab = new ipz.IpzMessengerTab({
      label: "Home",
      activeIcon: "images/HomeIconActive.png",
      inactiveIcon: "images/HomeIconInactive.png",
      superLayer: this
    });
    callsTab = new ipz.IpzMessengerTab({
      label: "Calls",
      activeIcon: "images/CallsIconActive.png",
      inactiveIcon: "images/CallsIconInactive.png",
      superLayer: this
    });
    cameraTab = new ipz.IpzMessengerTab({
      label: "",
      activeIcon: "images/CameraIconActive.png",
      inactiveIcon: "images/CameraIconInactive.png",
      iconsize: 45,
      superLayer: this
    });
    peopleTab = new ipz.IpzMessengerTab({
      label: "People",
      activeIcon: "images/PeopleIconActive.png",
      inactiveIcon: "images/PeopleIconInactive.png",
      superLayer: this
    });
    gamesTab = new ipz.IpzMessengerTab({
      label: "Games",
      activeIcon: "images/GamesIconActive.png",
      inactiveIcon: "images/GamesIconInactive.png",
      superLayer: this
    });
    tabBar = new ipz.IpzMessengerTabBar({
      tabs: [homeTab, callsTab, cameraTab, peopleTab, gamesTab],
      activeColor: "blue",
      inactiveColor: "grey",
      start: 0,
      viewTop: options.y,
      superLayer: this
    });
    tabBar.setBadgeValue(1, 2);
    homeView = new ipz.IpzMessengerHome({
      superLayer: homeTab.view,
      height: Screen.height - 130
    }, user);
    callsView = new ios.View({
      name: "calls",
      superLayer: callsTab.view,
      backgroundColor: "red",
      constraints: {
        leading: 0,
        trailing: 0,
        top: 0,
        bottom: 2
      }
    });
    camView = new ios.View({
      superLayer: cameraTab.view,
      backgroundColor: "black",
      constraints: {
        leading: 0,
        trailing: 0,
        top: 0,
        bottom: 2
      }
    });
    peopleView = new ios.View({
      superLayer: peopleTab.view,
      backgroundColor: "orange",
      constraints: {
        leading: 0,
        trailing: 0,
        top: 0,
        bottom: 2
      }
    });
    gamesView = new ios.View({
      superLayer: gamesTab.view,
      backgroundColor: "green",
      constraints: {
        leading: 0,
        trailing: 0,
        top: 0,
        bottom: 2
      }
    });
  }

  return IpzMessenger;

})(Layer);

module.exports = IpzMessenger;
