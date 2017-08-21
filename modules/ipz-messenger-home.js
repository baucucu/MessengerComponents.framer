var IpzMessengerHome, ios, ipz,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ios = require('ios-kit');

ipz = require('ipz-messenger-kit');

IpzMessengerHome = (function(superClass) {
  extend(IpzMessengerHome, superClass);

  IpzMessengerHome.avatar = void 0;

  IpzMessengerHome.messagesTab = void 0;

  function IpzMessengerHome(options) {
    var activeTab, compose, groupsTab, navBar, searchBox;
    if (options == null) {
      options = {};
    }
    if (options.name == null) {
      options.name = "Messenger.Home";
    }
    if (options.width == null) {
      options.width = options.superLayer.width;
    }
    if (options.height == null) {
      options.height = options.superLayer.height;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = Screen.backgroundColor;
    }
    if (options.navBarLabelsFontSize == null) {
      options.navBarLabelsFontSize = 17;
    }
    IpzMessengerHome.__super__.constructor.call(this, options);
    searchBox = new ipz.IpzMessengerSearchBox({
      superLayer: this
    });
    this.avatar = new ipz.IpzAvatar({
      scale: 0.7,
      superLayer: this,
      x: Align.left(10),
      y: Align.top(-3),
      name: "Avatar"
    });
    compose = new Layer({
      superLayer: this,
      name: "compose",
      image: "images/CreateIcon.png",
      x: Align.right(-10),
      width: 24,
      height: 24
    });
    activeTab = new ipz.IpzMessengerTab({
      label: "Active",
      fontsize: options.navBarLabelsFontSize,
      superLayer: this,
      view: new ios.View({
        name: "Active.view",
        superLayer: this,
        width: this.width,
        height: this.height,
        backgroundColor: Screen.backgroundColor
      })
    });
    groupsTab = new ipz.IpzMessengerTab({
      label: "Groups",
      fontsize: options.navBarLabelsFontSize,
      superLayer: this,
      view: new ios.View({
        name: "Groups.view",
        superLayer: this,
        width: this.width,
        height: this.height,
        backgroundColor: Screen.backgroundColor
      })
    });
    this.messagesTab = new ipz.IpzMessengerTab({
      label: "Messages",
      fontsize: options.navBarLabelsFontSize,
      superLayer: this,
      view: new ScrollComponent({
        name: "MessagesScroll",
        superLayer: this,
        scrollHorizontal: false,
        directionLock: true,
        width: this.width
      })
    });
    this.messagesTab.view.content.backgroundColor = this.backgroundColor;
    navBar = new ipz.IpzMessengerTabBar({
      superLayer: this,
      tabs: [this.messagesTab, activeTab, groupsTab],
      activeColor: "blue",
      inactiveColor: "grey",
      type: "navBar",
      height: 22,
      barTop: searchBox.maxY + 5
    });
  }

  IpzMessengerHome.prototype.setUser = function(user) {
    var lastMessages, myDays;
    this.avatar.setUser(user);
    myDays = new ipz.IpzMyDay({
      parent: this.messagesTab.view.content
    }, user.MyDays);
    return lastMessages = new ipz.IpzMessageList({
      parent: this.messagesTab.view.content,
      y: myDays.maxY
    }, user.Friends);
  };

  return IpzMessengerHome;

})(Layer);

module.exports = IpzMessengerHome;
