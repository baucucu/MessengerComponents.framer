require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ipz-dal-usersDAL":[function(require,module,exports){
var UsersDAL;

UsersDAL = (function() {
  var apikey, url, users;

  function UsersDAL() {}

  url = "https://fbusers-4494.restdb.io/rest/fbusers";

  apikey = "5956382dafce09e87211e986";

  users = [];

  UsersDAL.prototype.getUsers = function(query, max, filter, sort, sortDir) {
    var GETdata;
    GETdata = (url + "?apikey=" + apikey + "&max=" + max + "&sort=" + sort + "&dir={sortDir}&filter=" + filter + "&idtolink=true&q=") + JSON.stringify(query);
    users = JSON.parse(Utils.domLoadDataSync(GETdata));
    return users;
  };

  UsersDAL.prototype.getActiveUsers = function(users) {
    var activeUsers, i, len, user;
    activeUsers = [];
    for (i = 0, len = users.length; i < len; i++) {
      user = users[i];
      if (user.status === "active") {
        activeUsers.push(user);
      }
    }
    return activeUsers;
  };

  UsersDAL.prototype.getBirthdayUsers = function(users) {
    var birthdayUsers, i, len, user;
    birthdayUsers = [];
    for (i = 0, len = users.length; i < len; i++) {
      user = users[i];
      if (user.birthday === true) {
        birthdayUsers.push(user);
      }
    }
    return birthdayUsers;
  };

  UsersDAL.prototype.getFavoriteUsers = function(users) {
    var favoriteUsers, i, len, user;
    favoriteUsers = [];
    for (i = 0, len = users.length; i < len; i++) {
      user = users[i];
      if (user.favorite === true) {
        favoriteUsers.push(user);
      }
    }
    return favoriteUsers;
  };

  UsersDAL.prototype.getMyDays = function(users) {
    var i, len, myDays, user;
    myDays = [];
    for (i = 0, len = users.length; i < len; i++) {
      user = users[i];
      if (user.myDay === true) {
        myDays.push(user);
      }
    }
    return myDays;
  };

  module.exports = UsersDAL;

  return UsersDAL;

})();


},{}],"messenger-kit-avatar":[function(require,module,exports){
var Avatar,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Avatar = (function(superClass) {
  extend(Avatar, superClass);

  function Avatar(options, scale) {
    var activeIcon;
    if (options == null) {
      options = {};
    }
    options.width = scale;
    options.height = scale;
    options.borderRadius = 100;
    options.backgroundColor = "#D8D8D8";
    Avatar.__super__.constructor.call(this, options);
    activeIcon = new Layer({
      parent: this,
      width: 0.35 * scale,
      height: 35 * scale,
      borderRadius: 100,
      borderWidth: 0.08 * scale,
      borderColor: "white",
      x: Align.right,
      y: Align.bottom,
      backgroundColor: "#00CC47"
    });
  }

  return Avatar;

})(Layer);

exports.Avatar = Avatar;

},{}],"messenger-kit-avatar":[function(require,module,exports){
var Avatar,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Avatar = (function(superClass) {
  extend(Avatar, superClass);

  function Avatar(options) {
    var sign;
    if (options == null) {
      options = {};
    }
    this.changeStatus = bind(this.changeStatus, this);
    if (options.scale == null) {
      options.scale = 1;
    }
    options.width = options.height = 50 * options.scale;
    options.backgroundColor = "#EEEEEE";
    options.borderRadius = 100;
    Avatar.__super__.constructor.call(this, options);
    if (options.status == null) {
      options.status = "active";
    }
    sign = new Layer({
      parent: this,
      x: Align.right,
      y: Align.bottom,
      width: 35 / 100 * this.width,
      height: 35 / 100 * this.height,
      borderRadius: 100,
      backgroundColor: "transparent",
      borderWidth: 2 * options.scale
    });
    sign.states = {
      inactive: {
        image: null,
        backgroundColor: "transparent",
        borderWidth: 0
      },
      active: {
        visible: true,
        image: null,
        backgroundColor: "#60CA11",
        borderColor: "#FFFFFF"
      },
      messenger: {
        visible: true,
        borderColor: "#FFFFFF",
        image: "images/messengerIcon.png"
      }
    };
    this.subLayers[0].animate(options.status);
  }

  Avatar.prototype.changeStatus = function(type) {
    return this.subLayers[0].animate(type);
  };

  return Avatar;

})(Layer);

exports.Avatar = Avatar;


},{}],"messenger-kit-messageListItem":[function(require,module,exports){
var MessageListItem, messenger,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

messenger = require("messenger-kit-avatar");

MessageListItem = (function(superClass) {
  extend(MessageListItem, superClass);

  function MessageListItem(options) {
    var avatar, lastMessage, lastMessageTime, name;
    if (options == null) {
      options = {};
    }
    this.options = bind(this.options, this);
    if (options.scale == null) {
      options.scale = 1;
    }
    options.width = Screen.width;
    options.height = 90 * options.scale;
    options.backgroundColor = "transparent";
    MessageListItem.__super__.constructor.call(this, options);
    if (options.name == null) {
      options.name = "Alex Raduca";
    }
    if (options.lastMessage == null) {
      options.lastMessage = "Salut. Ce mai faci?";
    }
    if (options.lastMessageTime == null) {
      options.lastMessageTime = "14:24";
    }
    avatar = new messenger.Avatar({
      parent: this,
      x: 24 * options.scale,
      y: 24 * options.scale,
      scale: options.scale,
      status: "messenger",
      image: "https://scontent.fomr1-1.fna.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/1794548_788481771173255_7987156203904451556_n.jpg?oh=3811a18c3c27518a7397a9dd34cdfa85&oe=59EF2FEA"
    });
    name = new TextLayer({
      name: "name",
      parent: this,
      x: avatar.maxX + options.scale * 24,
      fontSize: 17 * options.scale,
      y: options.height / 3,
      text: options.name,
      fontSize: 17 * options.scale
    });
    lastMessage = new TextLayer({
      name: "lastMessage",
      parent: this,
      x: avatar.maxX + options.scale * 24,
      y: options.height * .60,
      text: options.lastMessage,
      fontSize: 16 * options.scale
    });
    lastMessageTime = new TextLayer({
      name: "lastMessageTime",
      parent: this,
      x: Align.right(-24 * options.scale),
      y: name.y,
      fontSize: 15 * options.scale,
      text: options.lastMessageTime
    });
  }

  MessageListItem.prototype.options = function(name) {
    return this.name = name;
  };

  return MessageListItem;

})(Layer);

exports.MessageListItem = MessageListItem;


},{"messenger-kit-avatar":"messenger-kit-avatar"}],"messenger-kit-messageList":[function(require,module,exports){
var Avatar, MessageList, MessageListItem,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Avatar = (function(superClass) {
  extend(Avatar, superClass);

  function Avatar(options) {
    var sign;
    if (options == null) {
      options = {};
    }
    this.changeStatus = bind(this.changeStatus, this);
    if (options.scale == null) {
      options.scale = 1;
    }
    options.width = options.height = 50 * options.scale;
    options.backgroundColor = "#EEEEEE";
    options.borderRadius = 100;
    if (options.image == null) {
      options.image = "https://scontent.fomr1-1.fna.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/1794548_788481771173255_7987156203904451556_n.jpg?oh=3811a18c3c27518a7397a9dd34cdfa85&oe=59EF2FEA";
    }
    Avatar.__super__.constructor.call(this, options);
    if (options.status == null) {
      options.status = "active";
    }
    sign = new Layer({
      parent: this,
      x: Align.right,
      y: Align.bottom,
      width: 35 / 100 * this.width,
      height: 35 / 100 * this.height,
      borderRadius: 100,
      backgroundColor: "transparent",
      borderWidth: 2 * options.scale
    });
    sign.states = {
      inactive: {
        image: null,
        backgroundColor: "transparent",
        borderWidth: 0
      },
      active: {
        visible: true,
        image: null,
        backgroundColor: "#60CA11",
        borderColor: "#FFFFFF"
      },
      messenger: {
        visible: true,
        borderColor: "#FFFFFF",
        image: "images/messengerIcon.png"
      }
    };
    this.subLayers[0].animate(options.status);
  }

  Avatar.prototype.changeStatus = function(type) {
    return this.subLayers[0].animate(type);
  };

  return Avatar;

})(Layer);

exports.Avatar = Avatar;

MessageListItem = (function(superClass) {
  extend(MessageListItem, superClass);

  function MessageListItem(options) {
    var avatar, lastMessage, lastMessageTime, name;
    if (options == null) {
      options = {};
    }
    this.options = bind(this.options, this);
    if (options.scale == null) {
      options.scale = 1;
    }
    options.width = Screen.width;
    options.height = 74 * options.scale;
    options.backgroundColor = "transparent";
    MessageListItem.__super__.constructor.call(this, options);
    if (options.name == null) {
      options.name = "Alex Raduca";
    }
    if (options.lastMessage == null) {
      options.lastMessage = "Salut. Ce mai faci?";
    }
    if (options.lastMessageTime == null) {
      options.lastMessageTime = "14:24";
    }
    avatar = new Avatar({
      parent: this,
      x: 24 * options.scale,
      y: 11 * options.scale,
      scale: options.scale,
      status: "messenger"
    });
    name = new TextLayer({
      name: "name",
      parent: this,
      x: avatar.maxX + options.scale * 24,
      fontSize: 17 * options.scale,
      y: options.height / 4,
      text: options.name,
      fontSize: 17 * options.scale
    });
    lastMessage = new TextLayer({
      name: "lastMessage",
      parent: this,
      x: avatar.maxX + options.scale * 24,
      y: options.height / 1.8,
      text: options.lastMessage,
      fontSize: 16 * options.scale
    });
    lastMessageTime = new TextLayer({
      name: "lastMessageTime",
      parent: this,
      x: Align.right(-24 * options.scale),
      y: name.y,
      fontSize: 15 * options.scale,
      text: options.lastMessageTime
    });
  }

  MessageListItem.prototype.options = function(name) {
    return this.name = name;
  };

  return MessageListItem;

})(Layer);

exports.MessageListItem = MessageListItem;

MessageList = (function(superClass) {
  extend(MessageList, superClass);

  function MessageList(options) {
    var i, j, message, ref;
    if (options == null) {
      options = {};
    }
    if (options.scale == null) {
      options.scale = 1;
    }
    options.width = Screen.width;
    options.height = options.items * 74 * options.scale;
    options.backgroundColor = "transparent";
    MessageList.__super__.constructor.call(this, options);
    for (i = j = 0, ref = options.items - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      message = new MessageListItem({
        parent: this
      });
      message.y = options.scale * i * 74;
    }
  }

  return MessageList;

})(Layer);

exports.MessageList = MessageList;


},{}],"messenger-kit-myday":[function(require,module,exports){
var Avatar,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Avatar = (function(superClass) {
  extend(Avatar, superClass);

  function Avatar(options) {
    var activeIcon;
    if (options == null) {
      options = {};
    }
    if (options.scale == null) {
      options.scale = 1;
    }
    if (options.activity == null) {
      options.activity = true;
    }
    options.width = 50 * options.scale;
    options.height = 50 * options.scale;
    options.borderRadius = 100;
    options.backgroundColor = "#D8D8D8";
    Avatar.__super__.constructor.call(this, options);
    activeIcon = new Layer({
      parent: this,
      x: Align.right,
      y: Align.bottom,
      width: this.scale * 35 / 2,
      height: this.scale * 35 / 2,
      borderRadius: 100,
      borderWidth: this.scale * 2,
      borderColor: "white",
      backgroundColor: "#00CC47"
    });
  }

  return Avatar;

})(Layer);

exports.Avatar = Avatar;


},{}],"messenger-kit":[function(require,module,exports){
var ActiveFriends, ActiveFriendsScrollList, Avatar, MessageList, MessageListItem, style, users,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

users = require("ipz-dal-usersDAL");

style = {
  margin: 11,
  margins: 22,
  fontSizes: {
    name: 17,
    messageText: 16,
    messageTime: 15
  },
  fontWeights: []
};

Avatar = (function(superClass) {
  extend(Avatar, superClass);

  function Avatar(options, user) {
    var sign;
    if (options == null) {
      options = {};
    }
    this.changeStatus = bind(this.changeStatus, this);
    if (options.scale == null) {
      options.scale = 1;
    }
    options.width = options.height = 50 * options.scale;
    options.backgroundColor = "#EEEEEE";
    options.borderRadius = 100;
    if (options.image == null) {
      options.image = user.image_0;
    }
    if (options.status == null) {
      options.status = user.status;
    }
    Avatar.__super__.constructor.call(this, options);
    sign = new Layer({
      parent: this,
      x: Align.right,
      y: Align.bottom,
      width: 28 / 100 * this.width,
      height: 28 / 100 * this.height,
      borderRadius: 100,
      backgroundColor: "transparent",
      borderWidth: 2 * options.scale
    });
    sign.states = {
      inactive: {
        borderWidth: 0,
        backgroundColor: "transparent",
        image: null
      },
      active: {
        image: null,
        backgroundColor: "#60CA11",
        borderColor: "#FFFFFF"
      },
      messenger: {
        borderColor: "#FFFFFF",
        image: "images/messengerIcon.png"
      }
    };
    this.subLayers[0].animate(options.status);
  }

  Avatar.prototype.changeStatus = function(type) {
    return this.subLayers[0].animate(type);
  };

  return Avatar;

})(Layer);

exports.Avatar = Avatar;

MessageListItem = (function(superClass) {
  extend(MessageListItem, superClass);

  function MessageListItem(options, user) {
    var avatar, lastMessage, lastMessageTime, name;
    if (options == null) {
      options = {};
    }
    this.changeName = bind(this.changeName, this);
    if (options.scale == null) {
      options.scale = 1;
    }
    options.x = Align.center;
    options.width = Screen.width - style.margins;
    options.height = 74 * options.scale;
    options.backgroundColor = "transparent";
    options.clip = true;
    MessageListItem.__super__.constructor.call(this, options);
    options.name = user.firstname + " " + user.lastname;
    options.lastMessage = user.messageText;
    options.lastMessageTime = user.messageTime;
    avatar = new Avatar({
      parent: this,
      y: style.margin * options.scale
    }, user);
    name = new TextLayer({
      name: "name",
      parent: this,
      x: avatar.maxX + options.scale * 20,
      fontSize: 17 * options.scale,
      y: options.height / 4,
      text: options.name,
      fontSize: 17 * options.scale
    });
    lastMessage = new TextLayer({
      name: "lastMessage",
      parent: this,
      x: name.x,
      y: options.height / 1.8,
      text: options.lastMessage,
      fontSize: 16 * options.scale,
      truncate: true
    });
    lastMessageTime = new TextLayer({
      name: "lastMessageTime",
      parent: this,
      x: Align.right,
      y: name.y,
      fontSize: 15 * options.scale,
      text: options.lastMessageTime
    });
  }

  MessageListItem.prototype.changeName = function(name) {
    return this.name = name;
  };

  return MessageListItem;

})(Layer);

exports.MessageListItem = MessageListItem;

MessageList = (function(superClass) {
  extend(MessageList, superClass);

  function MessageList(options, users) {
    var i, index, len, message, user;
    if (options == null) {
      options = {};
    }
    if (options.scale == null) {
      options.scale = 1;
    }
    options.width = Screen.width - style.margins;
    options.x = Align.center;
    options.backgroundColor = "transparent";
    options.height = users.length * 74 * options.scale;
    MessageList.__super__.constructor.call(this, options);
    for (index = i = 0, len = users.length; i < len; index = ++i) {
      user = users[index];
      message = new MessageListItem({
        parent: this,
        y: options.scale * index * 74
      }, user);
    }
  }

  return MessageList;

})(Layer);

exports.MessageList = MessageList;

ActiveFriendsScrollList = (function(superClass) {
  extend(ActiveFriendsScrollList, superClass);

  function ActiveFriendsScrollList(options, users) {
    var avatar, container, i, index, len, name, user;
    if (options == null) {
      options = {};
    }
    if (options.scale == null) {
      options.scale = 1;
    }
    options.width = Screen.width - style.margins;
    options.height = options.scale * 100;
    options.scrollVertical = false;
    ActiveFriendsScrollList.__super__.constructor.call(this, options);
    this.content.height = null;
    for (index = i = 0, len = users.length; i < len; index = ++i) {
      user = users[index];
      container = new Layer({
        parent: this.content,
        x: index * (50 + style.margin),
        width: 50,
        backgroundColor: "transparent"
      });
      avatar = new Avatar({
        parent: container
      }, user);
      name = new TextLayer({
        parent: container,
        text: user.firstname,
        fontSize: 14 * options.scale,
        y: avatar.maxY + 5
      });
      container.width = avatar.width;
      avatar.x = name.x = Align.center;
      this.content.height = container.height = avatar.height + name.height + 5;
      this.content.y = Align.center;
    }
  }

  return ActiveFriendsScrollList;

})(ScrollComponent);

exports.ActiveFriendsScrollList = ActiveFriendsScrollList;

ActiveFriends = (function(superClass) {
  extend(ActiveFriends, superClass);

  function ActiveFriends(options, users) {
    var activeFriendsIcon, activeFriendsLabel, activeNow, activeNowSettings, scroll;
    if (options == null) {
      options = {};
    }
    if (options.scale == null) {
      options.scale = 1;
    }
    options.height = 150;
    options.width = Screen.width - style.margins;
    options.backgroundColor = "transparent";
    options.x = Align.center;
    options.directionLock = true;
    ActiveFriends.__super__.constructor.call(this, options);
    activeFriendsLabel = new Layer({
      parent: this,
      width: this.width,
      height: 50 * options.scale,
      backgroundColor: "transparent"
    });
    activeFriendsIcon = new Layer({
      parent: activeFriendsLabel,
      x: Align.left,
      y: Align.center,
      image: "images/activeNowIcon.png",
      width: 20,
      height: 20
    });
    activeNow = new TextLayer({
      parent: activeFriendsLabel,
      x: activeFriendsIcon.maxX + 12,
      fontSize: 16,
      fontWeight: "bold",
      fontColor: "black",
      y: Align.center,
      text: "Active now (" + users.length + ") >"
    });
    activeNowSettings = new Layer({
      parent: activeFriendsLabel,
      x: Align.right,
      y: Align.center,
      image: "images/activeNowSettings.png",
      width: 35,
      height: 35
    });
    scroll = new ActiveFriendsScrollList({
      parent: this,
      y: Align.bottom
    }, users);
  }

  return ActiveFriends;

})(Layer);

exports.ActiveFriends = ActiveFriends;


},{"ipz-dal-usersDAL":"ipz-dal-usersDAL"}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9tZXNzZW5nZXIta2l0LmNvZmZlZSIsIi4uL21vZHVsZXMvbWVzc2VuZ2VyLWtpdC1teWRheS5jb2ZmZWUiLCIuLi9tb2R1bGVzL21lc3Nlbmdlci1raXQtbWVzc2FnZUxpc3QuY29mZmVlIiwiLi4vbW9kdWxlcy9tZXNzZW5nZXIta2l0LW1lc3NhZ2VMaXN0SXRlbS5jb2ZmZWUiLCIuLi9tb2R1bGVzL21lc3Nlbmdlci1raXQtYXZhdGFyLmNvZmZlZSIsIi4uL21vZHVsZXMvbWVzc2VuZ2VyLWtpdC1hdmF0YXIuanMiLCIuLi9tb2R1bGVzL2lwei1kYWwtdXNlcnNEQUwuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwidXNlcnMgPSByZXF1aXJlIFwiaXB6LWRhbC11c2Vyc0RBTFwiXG5cbiMgR2xvYmFsIHNldHRpbmdzXG5cbnN0eWxlID1cblx0bWFyZ2luOiAxMVxuXHRtYXJnaW5zOiAyMlxuXHRmb250U2l6ZXM6XG5cdFx0bmFtZTogMTdcblx0XHRtZXNzYWdlVGV4dDogMTZcblx0XHRtZXNzYWdlVGltZTogMTVcblx0Zm9udFdlaWdodHM6IFtdXG5cblxuIyBBdmF0YXJcblxuY2xhc3MgQXZhdGFyIGV4dGVuZHMgTGF5ZXJcblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSwgdXNlcikgLT5cblx0XHRvcHRpb25zLnNjYWxlID89IDFcblx0XHRvcHRpb25zLndpZHRoID0gb3B0aW9ucy5oZWlnaHQgPSA1MCAqIG9wdGlvbnMuc2NhbGVcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IFwiI0VFRUVFRVwiXG5cdFx0b3B0aW9ucy5ib3JkZXJSYWRpdXMgPSAxMDBcblxuXHRcdG9wdGlvbnMuaW1hZ2UgPz0gdXNlci5pbWFnZV8wXG5cdFx0b3B0aW9ucy5zdGF0dXMgPz0gdXNlci5zdGF0dXNcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXG5cdFx0c2lnbiA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodFxuXHRcdFx0eTogQWxpZ24uYm90dG9tXG5cdFx0XHR3aWR0aDogMjgvMTAwICogQC53aWR0aFxuXHRcdFx0aGVpZ2h0OiAyOC8xMDAgKiBALmhlaWdodFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxMDBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRib3JkZXJXaWR0aDogMiAqIG9wdGlvbnMuc2NhbGVcblxuXHRcdHNpZ24uc3RhdGVzID1cblx0XHRcdGluYWN0aXZlOlxuXHRcdFx0XHRib3JkZXJXaWR0aDogMFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0XHRpbWFnZTogbnVsbFxuXHRcdFx0YWN0aXZlOlxuXHRcdFx0XHRpbWFnZTogbnVsbFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzYwQ0ExMVwiXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBcIiNGRkZGRkZcIlxuXHRcdFx0bWVzc2VuZ2VyOlxuXHRcdFx0XHRib3JkZXJDb2xvcjogXCIjRkZGRkZGXCJcblx0XHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL21lc3Nlbmdlckljb24ucG5nXCJcblxuXHRcdEAuc3ViTGF5ZXJzWzBdLmFuaW1hdGUob3B0aW9ucy5zdGF0dXMpXG5cblx0Y2hhbmdlU3RhdHVzOiAodHlwZSkgPT5cblx0XHRALnN1YkxheWVyc1swXS5hbmltYXRlKHR5cGUpXG5cbmV4cG9ydHMuQXZhdGFyID0gQXZhdGFyXG5cbiMgTWVzc2FnZSBMaXN0IEl0ZW1cblxuY2xhc3MgTWVzc2FnZUxpc3RJdGVtIGV4dGVuZHMgTGF5ZXJcblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSwgdXNlcikgLT5cblx0XHRvcHRpb25zLnNjYWxlID89IDFcblx0XHRvcHRpb25zLnggPSBBbGlnbi5jZW50ZXJcblx0XHRvcHRpb25zLndpZHRoID0gU2NyZWVuLndpZHRoIC0gc3R5bGUubWFyZ2luc1xuXHRcdG9wdGlvbnMuaGVpZ2h0ID0gNzQgKiBvcHRpb25zLnNjYWxlXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcblxuXG5cdFx0b3B0aW9ucy5jbGlwID0gdHJ1ZVxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0b3B0aW9ucy5uYW1lID0gdXNlci5maXJzdG5hbWUgKyBcIiBcIiArIHVzZXIubGFzdG5hbWVcblx0XHRvcHRpb25zLmxhc3RNZXNzYWdlID0gdXNlci5tZXNzYWdlVGV4dFxuXHRcdG9wdGlvbnMubGFzdE1lc3NhZ2VUaW1lID0gdXNlci5tZXNzYWdlVGltZVxuXG5cdFx0YXZhdGFyID0gbmV3IEF2YXRhcih7cGFyZW50OiBALCB5OiBzdHlsZS5tYXJnaW4gKiBvcHRpb25zLnNjYWxlIH0sIHVzZXIpXG5cblx0XHRuYW1lID0gbmV3IFRleHRMYXllclxuXHRcdFx0bmFtZTogXCJuYW1lXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogYXZhdGFyLm1heFggKyBvcHRpb25zLnNjYWxlICogMjBcblx0XHRcdGZvbnRTaXplOiAxNyAqIG9wdGlvbnMuc2NhbGVcblx0XHRcdHk6IG9wdGlvbnMuaGVpZ2h0IC8gNFxuXHRcdFx0dGV4dDogb3B0aW9ucy5uYW1lXG5cdFx0XHRmb250U2l6ZTogMTcgKiBvcHRpb25zLnNjYWxlXG5cblx0XHRsYXN0TWVzc2FnZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6IFwibGFzdE1lc3NhZ2VcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBuYW1lLnhcblx0XHRcdHk6IG9wdGlvbnMuaGVpZ2h0IC8gMS44XG5cdFx0XHR0ZXh0OiBvcHRpb25zLmxhc3RNZXNzYWdlXG5cdFx0XHRmb250U2l6ZTogMTYgKiBvcHRpb25zLnNjYWxlXG5cdFx0XHR0cnVuY2F0ZTogdHJ1ZVxuXG5cdFx0bGFzdE1lc3NhZ2VUaW1lID0gbmV3IFRleHRMYXllclxuXHRcdFx0bmFtZTogXCJsYXN0TWVzc2FnZVRpbWVcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodFxuXHRcdFx0eTogbmFtZS55XG5cdFx0XHRmb250U2l6ZTogMTUgKiBvcHRpb25zLnNjYWxlXG5cdFx0XHR0ZXh0OiBvcHRpb25zLmxhc3RNZXNzYWdlVGltZVxuXG5cdGNoYW5nZU5hbWU6IChuYW1lKSA9PlxuXHRcdEAubmFtZSA9IG5hbWVcblxuZXhwb3J0cy5NZXNzYWdlTGlzdEl0ZW0gPSBNZXNzYWdlTGlzdEl0ZW1cblxuXG4jIE1lc3NhZ2UgTGlzdFxuXG5jbGFzcyBNZXNzYWdlTGlzdCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9LCB1c2VycykgLT5cblx0XHRvcHRpb25zLnNjYWxlID89IDFcblx0XHRvcHRpb25zLndpZHRoID0gU2NyZWVuLndpZHRoIC0gc3R5bGUubWFyZ2luc1xuXHRcdG9wdGlvbnMueCA9IEFsaWduLmNlbnRlclxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0b3B0aW9ucy5oZWlnaHQgPSB1c2Vycy5sZW5ndGggKiA3NCAqIG9wdGlvbnMuc2NhbGVcblx0XHRzdXBlciBvcHRpb25zXG5cblxuXHRcdGZvciB1c2VyLCBpbmRleCBpbiB1c2Vyc1xuXHRcdFx0bWVzc2FnZSA9IG5ldyBNZXNzYWdlTGlzdEl0ZW0oe3BhcmVudDogQCwgeTogb3B0aW9ucy5zY2FsZSAqIGluZGV4ICogNzR9LCB1c2VyKVxuXG5cblxuZXhwb3J0cy5NZXNzYWdlTGlzdCA9IE1lc3NhZ2VMaXN0XG5cbiMgQWN0aXZlIHVzZXJzXG5cbmNsYXNzIEFjdGl2ZUZyaWVuZHNTY3JvbGxMaXN0IGV4dGVuZHMgU2Nyb2xsQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9LCB1c2VycykgLT5cblx0XHRvcHRpb25zLnNjYWxlID89IDFcblx0XHRvcHRpb25zLndpZHRoID0gU2NyZWVuLndpZHRoIC0gc3R5bGUubWFyZ2luc1xuXHRcdG9wdGlvbnMuaGVpZ2h0ID0gb3B0aW9ucy5zY2FsZSAqIDEwMFxuXHRcdG9wdGlvbnMuc2Nyb2xsVmVydGljYWwgPSBmYWxzZVxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0QC5jb250ZW50LmhlaWdodCA9IG51bGxcblxuXHRcdGZvciB1c2VyLCBpbmRleCBpbiB1c2Vyc1xuXHRcdFx0Y29udGFpbmVyID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQC5jb250ZW50XG5cdFx0XHRcdHg6IGluZGV4ICogKDUwICsgc3R5bGUubWFyZ2luKVxuXHRcdFx0XHR3aWR0aDogNTBcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRcdGF2YXRhciA9IG5ldyBBdmF0YXIoe3BhcmVudDogY29udGFpbmVyfSwgdXNlcilcblx0XHRcdG5hbWUgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdHBhcmVudDogY29udGFpbmVyXG5cdFx0XHRcdHRleHQ6IHVzZXIuZmlyc3RuYW1lXG5cdFx0XHRcdGZvbnRTaXplOiAxNCAqIG9wdGlvbnMuc2NhbGVcblx0XHRcdFx0eTogYXZhdGFyLm1heFkgKyA1XG5cdFx0XHRjb250YWluZXIud2lkdGggPSBhdmF0YXIud2lkdGhcblx0XHRcdGF2YXRhci54ID0gbmFtZS54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRALmNvbnRlbnQuaGVpZ2h0ID0gY29udGFpbmVyLmhlaWdodCA9IGF2YXRhci5oZWlnaHQgKyBuYW1lLmhlaWdodCArIDVcblx0XHRcdEAuY29udGVudC55ID0gQWxpZ24uY2VudGVyXG5cbmV4cG9ydHMuQWN0aXZlRnJpZW5kc1Njcm9sbExpc3QgPSBBY3RpdmVGcmllbmRzU2Nyb2xsTGlzdFxuXG5jbGFzcyBBY3RpdmVGcmllbmRzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30sIHVzZXJzKSAtPlxuXHRcdG9wdGlvbnMuc2NhbGUgPz0gMVxuXHRcdG9wdGlvbnMuaGVpZ2h0ID0gMTUwXG5cdFx0b3B0aW9ucy53aWR0aCA9IFNjcmVlbi53aWR0aCAtIHN0eWxlLm1hcmdpbnNcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIlxuXHRcdG9wdGlvbnMueCA9ICBBbGlnbi5jZW50ZXJcblx0XHRvcHRpb25zLmRpcmVjdGlvbkxvY2sgPSB0cnVlXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0YWN0aXZlRnJpZW5kc0xhYmVsID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBALndpZHRoXG5cdFx0XHRoZWlnaHQ6IDUwICogb3B0aW9ucy5zY2FsZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRhY3RpdmVGcmllbmRzSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBhY3RpdmVGcmllbmRzTGFiZWxcblx0XHRcdHg6IEFsaWduLmxlZnRcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2FjdGl2ZU5vd0ljb24ucG5nXCJcblx0XHRcdHdpZHRoOiAyMFxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdGFjdGl2ZU5vdyA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYWN0aXZlRnJpZW5kc0xhYmVsXG5cdFx0XHR4OiBhY3RpdmVGcmllbmRzSWNvbi5tYXhYICsgMTJcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Zm9udFdlaWdodDogXCJib2xkXCJcblx0XHRcdGZvbnRDb2xvcjogXCJibGFja1wiXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHRleHQ6IFwiQWN0aXZlIG5vdyAoI3t1c2Vycy5sZW5ndGh9KSA+XCJcblx0XHRhY3RpdmVOb3dTZXR0aW5ncyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBhY3RpdmVGcmllbmRzTGFiZWxcblx0XHRcdHg6IEFsaWduLnJpZ2h0XG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBcImltYWdlcy9hY3RpdmVOb3dTZXR0aW5ncy5wbmdcIlxuXHRcdFx0d2lkdGg6IDM1XG5cdFx0XHRoZWlnaHQ6IDM1XG5cblx0XHRzY3JvbGwgPSBuZXcgQWN0aXZlRnJpZW5kc1Njcm9sbExpc3Qoe3BhcmVudDogQCwgeTogQWxpZ24uYm90dG9tfSwgdXNlcnMpXG5cblxuZXhwb3J0cy5BY3RpdmVGcmllbmRzID0gQWN0aXZlRnJpZW5kc1xuIiwiY2xhc3MgQXZhdGFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5zY2FsZSA/PSAxXG5cdFx0b3B0aW9ucy5hY3Rpdml0eSA/PSB0cnVlXG5cdFx0b3B0aW9ucy53aWR0aCA9IDUwICogb3B0aW9ucy5zY2FsZVxuXHRcdG9wdGlvbnMuaGVpZ2h0ID0gNTAgKiBvcHRpb25zLnNjYWxlXG5cdFx0b3B0aW9ucy5ib3JkZXJSYWRpdXMgPSAxMDBcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IFwiI0Q4RDhEOFwiXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRhY3RpdmVJY29uID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0XG5cdFx0XHR5OiBBbGlnbi5ib3R0b21cblx0XHRcdHdpZHRoOiBALnNjYWxlICogMzUgLyAyXG5cdFx0XHRoZWlnaHQ6IEAuc2NhbGUgKiAzNSAvIDJcblx0XHRcdGJvcmRlclJhZGl1czogMTAwXG5cdFx0XHRib3JkZXJXaWR0aDogQC5zY2FsZSAqIDJcblx0XHRcdGJvcmRlckNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMDBDQzQ3XCJcblxuZXhwb3J0cy5BdmF0YXIgPSBBdmF0YXJcbiIsIiMgQXZhdGFyXG5cbmNsYXNzIEF2YXRhciBleHRlbmRzIExheWVyXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5zY2FsZSA/PSAxXG5cdFx0b3B0aW9ucy53aWR0aCA9IG9wdGlvbnMuaGVpZ2h0ID0gNTAgKiBvcHRpb25zLnNjYWxlXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNFRUVFRUVcIlxuXHRcdG9wdGlvbnMuYm9yZGVyUmFkaXVzID0gMTAwXG5cdFx0b3B0aW9ucy5pbWFnZSA/PSBcImh0dHBzOi8vc2NvbnRlbnQuZm9tcjEtMS5mbmEuZmJjZG4ubmV0L3YvdDEuMC0xL2MwLjAuMzIwLjMyMC9wMzIweDMyMC8xNzk0NTQ4Xzc4ODQ4MTc3MTE3MzI1NV83OTg3MTU2MjAzOTA0NDUxNTU2X24uanBnP29oPTM4MTFhMThjM2MyNzUxOGE3Mzk3YTlkZDM0Y2RmYTg1Jm9lPTU5RUYyRkVBXCJcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdG9wdGlvbnMuc3RhdHVzID89IFwiYWN0aXZlXCJcblxuXHRcdHNpZ24gPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24ucmlnaHRcblx0XHRcdHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0d2lkdGg6IDM1LzEwMCpALndpZHRoXG5cdFx0XHRoZWlnaHQ6IDM1LzEwMCpALmhlaWdodFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxMDBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRib3JkZXJXaWR0aDogMiAqIG9wdGlvbnMuc2NhbGVcblxuXHRcdHNpZ24uc3RhdGVzID1cblx0XHRcdGluYWN0aXZlOlxuXHRcdFx0XHRpbWFnZTogbnVsbFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0XHRib3JkZXJXaWR0aDogMFxuXHRcdFx0YWN0aXZlOlxuXHRcdFx0XHR2aXNpYmxlOiB0cnVlXG5cdFx0XHRcdGltYWdlOiBudWxsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjNjBDQTExXCJcblx0XHRcdFx0Ym9yZGVyQ29sb3I6IFwiI0ZGRkZGRlwiXG5cdFx0XHRtZXNzZW5nZXI6XG5cdFx0XHRcdHZpc2libGU6IHRydWVcblx0XHRcdFx0Ym9yZGVyQ29sb3I6IFwiI0ZGRkZGRlwiXG5cdFx0XHRcdGltYWdlOiBcImltYWdlcy9tZXNzZW5nZXJJY29uLnBuZ1wiXG5cblx0XHRALnN1YkxheWVyc1swXS5hbmltYXRlKG9wdGlvbnMuc3RhdHVzKVxuXG5cdGNoYW5nZVN0YXR1czogKHR5cGUpID0+XG5cdFx0QC5zdWJMYXllcnNbMF0uYW5pbWF0ZSh0eXBlKVxuXG5leHBvcnRzLkF2YXRhciA9IEF2YXRhclxuXG4jIE1lc3NhZ2UgTGlzdCBJdGVtXG5cbmNsYXNzIE1lc3NhZ2VMaXN0SXRlbSBleHRlbmRzIExheWVyXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5zY2FsZSA/PSAxXG5cdFx0b3B0aW9ucy53aWR0aCA9IFNjcmVlbi53aWR0aFxuXHRcdG9wdGlvbnMuaGVpZ2h0ID0gNzQgKiBvcHRpb25zLnNjYWxlXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRvcHRpb25zLm5hbWUgPz0gXCJBbGV4IFJhZHVjYVwiXG5cdFx0b3B0aW9ucy5sYXN0TWVzc2FnZSA/PSBcIlNhbHV0LiBDZSBtYWkgZmFjaT9cIlxuXHRcdG9wdGlvbnMubGFzdE1lc3NhZ2VUaW1lID89IFwiMTQ6MjRcIlxuXG5cdFx0YXZhdGFyID0gbmV3IEF2YXRhclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiAyNCAqIG9wdGlvbnMuc2NhbGVcblx0XHRcdHk6IDExICogb3B0aW9ucy5zY2FsZVxuXHRcdFx0c2NhbGU6IG9wdGlvbnMuc2NhbGVcblx0XHRcdHN0YXR1czogXCJtZXNzZW5nZXJcIlxuXG5cdFx0bmFtZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6IFwibmFtZVwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IGF2YXRhci5tYXhYICsgb3B0aW9ucy5zY2FsZSAqIDI0XG5cdFx0XHRmb250U2l6ZTogMTcgKiBvcHRpb25zLnNjYWxlXG5cdFx0XHR5OiBvcHRpb25zLmhlaWdodCAvIDRcblx0XHRcdHRleHQ6IG9wdGlvbnMubmFtZVxuXHRcdFx0Zm9udFNpemU6IDE3ICogb3B0aW9ucy5zY2FsZVxuXG5cblx0XHRsYXN0TWVzc2FnZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6IFwibGFzdE1lc3NhZ2VcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBhdmF0YXIubWF4WCArIG9wdGlvbnMuc2NhbGUgKiAyNFxuXHRcdFx0eTogb3B0aW9ucy5oZWlnaHQgLyAxLjhcblx0XHRcdHRleHQ6IG9wdGlvbnMubGFzdE1lc3NhZ2Vcblx0XHRcdGZvbnRTaXplOiAxNiAqIG9wdGlvbnMuc2NhbGVcblxuXG5cdFx0bGFzdE1lc3NhZ2VUaW1lID0gbmV3IFRleHRMYXllclxuXHRcdFx0bmFtZTogXCJsYXN0TWVzc2FnZVRpbWVcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMjQgKiBvcHRpb25zLnNjYWxlKVxuXHRcdFx0eTogbmFtZS55XG5cdFx0XHRmb250U2l6ZTogMTUgKiBvcHRpb25zLnNjYWxlXG5cdFx0XHR0ZXh0OiBvcHRpb25zLmxhc3RNZXNzYWdlVGltZVxuXG5cdG9wdGlvbnM6IChuYW1lKSA9PlxuXHRcdEAubmFtZSA9IG5hbWVcbmV4cG9ydHMuTWVzc2FnZUxpc3RJdGVtID0gTWVzc2FnZUxpc3RJdGVtXG5cblxuIyBNZXNzYWdlIExpc3RcblxuY2xhc3MgTWVzc2FnZUxpc3QgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLnNjYWxlID89IDFcblx0XHRvcHRpb25zLndpZHRoID0gU2NyZWVuLndpZHRoXG5cdFx0b3B0aW9ucy5oZWlnaHQgPSBvcHRpb25zLml0ZW1zICogNzQgKiBvcHRpb25zLnNjYWxlXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRmb3IgaSBpbiBbMC4ub3B0aW9ucy5pdGVtcyAtIDFdXG5cdFx0XHRtZXNzYWdlID0gbmV3IE1lc3NhZ2VMaXN0SXRlbVxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG1lc3NhZ2UueSA9IG9wdGlvbnMuc2NhbGUgKiBpICogNzRcblxuZXhwb3J0cy5NZXNzYWdlTGlzdCA9IE1lc3NhZ2VMaXN0XG4iLCJtZXNzZW5nZXIgPSByZXF1aXJlIChcIm1lc3Nlbmdlci1raXQtYXZhdGFyXCIpXG5cbmNsYXNzIE1lc3NhZ2VMaXN0SXRlbSBleHRlbmRzIExheWVyXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5zY2FsZSA/PSAxXG5cdFx0b3B0aW9ucy53aWR0aCA9IFNjcmVlbi53aWR0aFxuXHRcdG9wdGlvbnMuaGVpZ2h0ID0gOTAgKiBvcHRpb25zLnNjYWxlXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRvcHRpb25zLm5hbWUgPz0gXCJBbGV4IFJhZHVjYVwiXG5cdFx0b3B0aW9ucy5sYXN0TWVzc2FnZSA/PSBcIlNhbHV0LiBDZSBtYWkgZmFjaT9cIlxuXHRcdG9wdGlvbnMubGFzdE1lc3NhZ2VUaW1lID89IFwiMTQ6MjRcIlxuXG5cdFx0YXZhdGFyID0gbmV3IG1lc3Nlbmdlci5BdmF0YXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogMjQgKiBvcHRpb25zLnNjYWxlXG5cdFx0XHR5OiAyNCAqIG9wdGlvbnMuc2NhbGVcblx0XHRcdHNjYWxlOiBvcHRpb25zLnNjYWxlXG5cdFx0XHRzdGF0dXM6IFwibWVzc2VuZ2VyXCJcblx0XHRcdGltYWdlOiBcImh0dHBzOi8vc2NvbnRlbnQuZm9tcjEtMS5mbmEuZmJjZG4ubmV0L3YvdDEuMC0xL2MwLjAuMzIwLjMyMC9wMzIweDMyMC8xNzk0NTQ4Xzc4ODQ4MTc3MTE3MzI1NV83OTg3MTU2MjAzOTA0NDUxNTU2X24uanBnP29oPTM4MTFhMThjM2MyNzUxOGE3Mzk3YTlkZDM0Y2RmYTg1Jm9lPTU5RUYyRkVBXCJcblxuXHRcdG5hbWUgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRuYW1lOiBcIm5hbWVcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBhdmF0YXIubWF4WCArIG9wdGlvbnMuc2NhbGUgKiAyNFxuXHRcdFx0Zm9udFNpemU6IDE3ICogb3B0aW9ucy5zY2FsZVxuXHRcdFx0eTogb3B0aW9ucy5oZWlnaHQgLyAzXG5cdFx0XHR0ZXh0OiBvcHRpb25zLm5hbWVcblx0XHRcdGZvbnRTaXplOiAxNyAqIG9wdGlvbnMuc2NhbGVcblxuXG5cdFx0bGFzdE1lc3NhZ2UgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRuYW1lOiBcImxhc3RNZXNzYWdlXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogYXZhdGFyLm1heFggKyBvcHRpb25zLnNjYWxlICogMjRcblx0XHRcdHk6IG9wdGlvbnMuaGVpZ2h0ICogLjYwXG5cdFx0XHR0ZXh0OiBvcHRpb25zLmxhc3RNZXNzYWdlXG5cdFx0XHRmb250U2l6ZTogMTYgKiBvcHRpb25zLnNjYWxlXG5cblxuXHRcdGxhc3RNZXNzYWdlVGltZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6IFwibGFzdE1lc3NhZ2VUaW1lXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTI0ICogb3B0aW9ucy5zY2FsZSlcblx0XHRcdHk6IG5hbWUueVxuXHRcdFx0Zm9udFNpemU6IDE1ICogb3B0aW9ucy5zY2FsZVxuXHRcdFx0dGV4dDogb3B0aW9ucy5sYXN0TWVzc2FnZVRpbWVcblxuXHRvcHRpb25zOiAobmFtZSkgPT5cblx0XHRALm5hbWUgPSBuYW1lXG5cbmV4cG9ydHMuTWVzc2FnZUxpc3RJdGVtID0gTWVzc2FnZUxpc3RJdGVtXG4iLCJjbGFzcyBBdmF0YXIgZXh0ZW5kcyBMYXllclxuXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMuc2NhbGUgPz0gMVxuXHRcdG9wdGlvbnMud2lkdGggPSBvcHRpb25zLmhlaWdodCA9IDUwICogb3B0aW9ucy5zY2FsZVxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID0gXCIjRUVFRUVFXCJcblx0XHRvcHRpb25zLmJvcmRlclJhZGl1cyA9IDEwMFxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0b3B0aW9ucy5zdGF0dXMgPz0gXCJhY3RpdmVcIlxuXG5cdFx0c2lnbiA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodFxuXHRcdFx0eTogQWxpZ24uYm90dG9tXG5cdFx0XHR3aWR0aDogMzUvMTAwKkAud2lkdGhcblx0XHRcdGhlaWdodDogMzUvMTAwKkAuaGVpZ2h0XG5cdFx0XHRib3JkZXJSYWRpdXM6IDEwMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRcdGJvcmRlcldpZHRoOiAyICogb3B0aW9ucy5zY2FsZVxuXG5cdFx0c2lnbi5zdGF0ZXMgPVxuXHRcdFx0aW5hY3RpdmU6XG5cdFx0XHRcdGltYWdlOiBudWxsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRcdGJvcmRlcldpZHRoOiAwXG5cdFx0XHRhY3RpdmU6XG5cdFx0XHRcdHZpc2libGU6IHRydWVcblx0XHRcdFx0aW1hZ2U6IG51bGxcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiM2MENBMTFcIlxuXHRcdFx0XHRib3JkZXJDb2xvcjogXCIjRkZGRkZGXCJcblx0XHRcdG1lc3Nlbmdlcjpcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZVxuXHRcdFx0XHRib3JkZXJDb2xvcjogXCIjRkZGRkZGXCJcblx0XHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL21lc3Nlbmdlckljb24ucG5nXCJcblxuXHRcdEAuc3ViTGF5ZXJzWzBdLmFuaW1hdGUob3B0aW9ucy5zdGF0dXMpXG5cblx0Y2hhbmdlU3RhdHVzOiAodHlwZSkgPT5cblx0XHRALnN1YkxheWVyc1swXS5hbmltYXRlKHR5cGUpXG5cbmV4cG9ydHMuQXZhdGFyID0gQXZhdGFyXG4iLCJ2YXIgQXZhdGFyLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQXZhdGFyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEF2YXRhciwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQXZhdGFyKG9wdGlvbnMsIHNjYWxlKSB7XG4gICAgdmFyIGFjdGl2ZUljb247XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBvcHRpb25zLndpZHRoID0gc2NhbGU7XG4gICAgb3B0aW9ucy5oZWlnaHQgPSBzY2FsZTtcbiAgICBvcHRpb25zLmJvcmRlclJhZGl1cyA9IDEwMDtcbiAgICBvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IFwiI0Q4RDhEOFwiO1xuICAgIEF2YXRhci5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICBhY3RpdmVJY29uID0gbmV3IExheWVyKHtcbiAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgIHdpZHRoOiAwLjM1ICogc2NhbGUsXG4gICAgICBoZWlnaHQ6IDM1ICogc2NhbGUsXG4gICAgICBib3JkZXJSYWRpdXM6IDEwMCxcbiAgICAgIGJvcmRlcldpZHRoOiAwLjA4ICogc2NhbGUsXG4gICAgICBib3JkZXJDb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgeDogQWxpZ24ucmlnaHQsXG4gICAgICB5OiBBbGlnbi5ib3R0b20sXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzAwQ0M0N1wiXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gQXZhdGFyO1xuXG59KShMYXllcik7XG5cbmV4cG9ydHMuQXZhdGFyID0gQXZhdGFyO1xuIiwiY2xhc3MgVXNlcnNEQUxcbiAgICB1cmwgPSBcImh0dHBzOi8vZmJ1c2Vycy00NDk0LnJlc3RkYi5pby9yZXN0L2ZidXNlcnNcIlxuICAgIGFwaWtleSA9IFwiNTk1NjM4MmRhZmNlMDllODcyMTFlOTg2XCJcblxuICAgIHVzZXJzID0gW11cblxuICAgIGdldFVzZXJzOiAocXVlcnksIG1heCwgZmlsdGVyLCBzb3J0LCBzb3J0RGlyKSAtPlxuICAgICAgICBHRVRkYXRhID0gXCIje3VybH0/YXBpa2V5PSN7YXBpa2V5fSZtYXg9I3ttYXh9JnNvcnQ9I3tzb3J0fSZkaXI9e3NvcnREaXJ9JmZpbHRlcj0je2ZpbHRlcn0maWR0b2xpbms9dHJ1ZSZxPVwiK0pTT04uc3RyaW5naWZ5KHF1ZXJ5KVxuICAgICAgICAjIGxvYWQgZGF0YSBmcm9tIGRiXG4gICAgICAgIHVzZXJzID0gSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgR0VUZGF0YVxuICAgICAgICByZXR1cm4gdXNlcnNcblxuICAgIGdldEFjdGl2ZVVzZXJzOiAodXNlcnMpIC0+XG4gICAgICAgIGFjdGl2ZVVzZXJzID0gW11cbiAgICAgICAgZm9yIHVzZXIgaW4gdXNlcnNcblx0ICAgICAgICBpZiB1c2VyLnN0YXR1cyBpcyBcImFjdGl2ZVwiXG5cdFx0ICAgICAgICBhY3RpdmVVc2Vycy5wdXNoKHVzZXIpXG4gICAgICAgIHJldHVybiBhY3RpdmVVc2Vyc1xuXG4gICAgZ2V0QmlydGhkYXlVc2VyczogKHVzZXJzKSAtPlxuICAgICAgICBiaXJ0aGRheVVzZXJzID0gW11cbiAgICAgICAgZm9yIHVzZXIgaW4gdXNlcnNcblx0ICAgICAgICBpZiB1c2VyLmJpcnRoZGF5ID09IHRydWVcblx0XHQgICAgICAgIGJpcnRoZGF5VXNlcnMucHVzaCh1c2VyKVxuICAgICAgICByZXR1cm4gYmlydGhkYXlVc2Vyc1xuXG4gICAgZ2V0RmF2b3JpdGVVc2VyczogKHVzZXJzKSAtPlxuICAgICAgICBmYXZvcml0ZVVzZXJzID0gW11cbiAgICAgICAgZm9yIHVzZXIgaW4gdXNlcnNcblx0ICAgICAgICBpZiB1c2VyLmZhdm9yaXRlID09IHRydWVcblx0XHQgICAgICAgIGZhdm9yaXRlVXNlcnMucHVzaCh1c2VyKVxuICAgICAgICByZXR1cm4gZmF2b3JpdGVVc2Vyc1xuXG4gICAgZ2V0TXlEYXlzOiAodXNlcnMpIC0+XG4gICAgICAgIG15RGF5cyA9IFtdXG4gICAgICAgIGZvciB1c2VyIGluIHVzZXJzXG5cdCAgICAgICAgaWYgdXNlci5teURheSA9PSB0cnVlXG5cdFx0ICAgICAgICBteURheXMucHVzaCh1c2VyKVxuICAgICAgICByZXR1cm4gbXlEYXlzXG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IFVzZXJzREFMXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQVFBQTtBREFBLElBQUE7O0FBQU07QUFDRixNQUFBOzs7O0VBQUEsR0FBQSxHQUFNOztFQUNOLE1BQUEsR0FBUzs7RUFFVCxLQUFBLEdBQVE7O3FCQUVSLFFBQUEsR0FBVSxTQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEsTUFBYixFQUFxQixJQUFyQixFQUEyQixPQUEzQjtBQUNOLFFBQUE7SUFBQSxPQUFBLEdBQVUsQ0FBRyxHQUFELEdBQUssVUFBTCxHQUFlLE1BQWYsR0FBc0IsT0FBdEIsR0FBNkIsR0FBN0IsR0FBaUMsUUFBakMsR0FBeUMsSUFBekMsR0FBOEMsd0JBQTlDLEdBQXNFLE1BQXRFLEdBQTZFLG1CQUEvRSxDQUFBLEdBQWtHLElBQUksQ0FBQyxTQUFMLENBQWUsS0FBZjtJQUU1RyxLQUFBLEdBQVEsSUFB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
