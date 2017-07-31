require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"DevicePixelRatio":[function(require,module,exports){
exports.DevicePixelRatio = (function() {
  var VALUE, dpr, log;

  function DevicePixelRatio() {}

  log = function(v) {
    console.log("DevicePixelRatio set as:", v);
    return v;
  };

  dpr = function() {
    var devicePixelRatio, device_2x, device_3p5x, device_3x, i, initialValue, j, k, len, len1, len2, ref, ref1, ref2, value;
    initialValue = 1;
    value = initialValue;
    if (Utils.isFramerStudio() || Utils.isDesktop()) {
      ref = ['apple-', 'google-nexus-', 'iphone-6-', 'iphone-5', 'ipad-air', 'nexus-9', 'applewatch'];
      for (i = 0, len = ref.length; i < len; i++) {
        device_2x = ref[i];
        if (_.startsWith(Framer.Device.deviceType, device_2x)) {
          value = 2;
        }
      }
      ref1 = ['apple-iphone-6s-plus', 'google-nexus-5', 'htc-one-', 'microsoft-lumia-', 'samsung-galaxy-note-', 'iphone-6plus', 'nexus-5'];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        device_3x = ref1[j];
        if (_.startsWith(Framer.Device.deviceType, device_3x)) {
          value = 3;
        }
      }
      ref2 = ['google-nexus-6'];
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        device_3p5x = ref2[k];
        if (_.startsWith(Framer.Device.deviceType, device_3p5x)) {
          value = 3.5;
        }
      }
    }
    if (value !== initialValue) {
      return log(value);
    }
    if (!Utils.isDesktop()) {
      devicePixelRatio = Utils.devicePixelRatio();
      if (devicePixelRatio > initialValue) {
        value = devicePixelRatio;
      }
    }
    return log(value);
  };

  VALUE = dpr();

  DevicePixelRatio.calc = function(v) {
    return v * VALUE;
  };

  DevicePixelRatio.value = VALUE;

  return DevicePixelRatio;

})();

exports.dpr = exports.DevicePixelRatio.calc;


},{}],"ipz-dal-usersDAL":[function(require,module,exports){
var CallsDAL, UsersDAL;

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

CallsDAL = (function() {
  var apikey, calls, url;

  function CallsDAL() {}

  url = "https://fbusers-4494.restdb.io/rest/calls";

  apikey = "8be0d27776dab9483acffbe9715ee02512be3";

  calls = [];

  CallsDAL.prototype.getCalls = function(query, max, filter, sort, sortDir) {
    var GETdata, users;
    GETdata = (url + "?apikey=" + apikey + "&max=" + max + "&sort=" + sort + "&dir={sortDir}&filter=" + filter + "&idtolink=true&q=") + JSON.stringify(query);
    users = JSON.parse(Utils.domLoadDataSync(GETdata));
    return calls;
  };

  module.exports(CallsDAL);

  return CallsDAL;

})();


},{}],"messenger-kit":[function(require,module,exports){
var ActiveFriends, ActiveFriendsScrollList, Avatar, MessageList, MessageListItem, MyDays, style, users,
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

exports.style = style;

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
      },
      myDay: {
        borderColor: "#FFFFFF",
        borderWidth: options.scale * 2,
        image: null,
        backgroundColor: "#0076FF"
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

MyDays = (function(superClass) {
  extend(MyDays, superClass);

  function MyDays(options, users) {
    var i, index, len, myDay, user;
    if (options == null) {
      options = {};
    }
    if (options.scale == null) {
      options.scale = 1;
    }
    options.x = Align.center;
    options.width = Screen.width - style.margins;
    options.height = options.scale * (125 + style.margins);
    options.scrollVertical = false;
    MyDays.__super__.constructor.call(this, options);
    for (index = i = 0, len = users.length; i < len; index = ++i) {
      user = users[index];
      myDay = new Avatar({}, user);
      myDay.parent = this.content;
      myDay.width = 90;
      myDay.height = 125;
      myDay.x = index * (myDay.width + style.margin / 2);
      myDay.y = Align.center;
      myDay.borderRadius = 5;
      myDay.subLayers[0].width = myDay.subLayers[0].height = 14;
      myDay.subLayers[0].y = Align.top(-4);
      myDay.subLayers[0].x = Align.right(4);
      myDay.changeStatus("myDay");
    }
  }

  return MyDays;

})(ScrollComponent);

exports.MyDays = MyDays;

MessageListItem = (function(superClass) {
  extend(MessageListItem, superClass);

  function MessageListItem(options, user) {
    var avatar, lastMessage, lastMessageTime, name, truncate;
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
      fontSize: 16 * options.scale
    }, truncate = true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9tZXNzZW5nZXIta2l0LmNvZmZlZSIsIi4uL21vZHVsZXMvaXB6LWRhbC11c2Vyc0RBTC5jb2ZmZWUiLCIuLi9tb2R1bGVzL0RldmljZVBpeGVsUmF0aW8uY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwidXNlcnMgPSByZXF1aXJlIFwiaXB6LWRhbC11c2Vyc0RBTFwiXG5cbiMgR2xvYmFsIHNldHRpbmdzXG5cbnN0eWxlID1cblx0bWFyZ2luOiAxMVxuXHRtYXJnaW5zOiAyMlxuXHRmb250U2l6ZXM6XG5cdFx0bmFtZTogMTdcblx0XHRtZXNzYWdlVGV4dDogMTZcblx0XHRtZXNzYWdlVGltZTogMTVcblx0Zm9udFdlaWdodHM6IFtdXG5cbmV4cG9ydHMuc3R5bGUgPSBzdHlsZVxuXG4jIEF2YXRhclxuXG5jbGFzcyBBdmF0YXIgZXh0ZW5kcyBMYXllclxuXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9LCB1c2VyKSAtPlxuXHRcdG9wdGlvbnMuc2NhbGUgPz0gMVxuXHRcdG9wdGlvbnMud2lkdGggPSBvcHRpb25zLmhlaWdodCA9IDUwICogb3B0aW9ucy5zY2FsZVxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID0gXCIjRUVFRUVFXCJcblx0XHRvcHRpb25zLmJvcmRlclJhZGl1cyA9IDEwMFxuXG5cdFx0b3B0aW9ucy5pbWFnZSA/PSB1c2VyLmltYWdlXzBcblx0XHRvcHRpb25zLnN0YXR1cyA/PSB1c2VyLnN0YXR1c1xuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cblx0XHRzaWduID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0XG5cdFx0XHR5OiBBbGlnbi5ib3R0b21cblx0XHRcdHdpZHRoOiAyOC8xMDAgKiBALndpZHRoXG5cdFx0XHRoZWlnaHQ6IDI4LzEwMCAqIEAuaGVpZ2h0XG5cdFx0XHRib3JkZXJSYWRpdXM6IDEwMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRcdGJvcmRlcldpZHRoOiAyICogb3B0aW9ucy5zY2FsZVxuXG5cdFx0c2lnbi5zdGF0ZXMgPVxuXHRcdFx0aW5hY3RpdmU6XG5cdFx0XHRcdGJvcmRlcldpZHRoOiAwXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRcdGltYWdlOiBudWxsXG5cdFx0XHRhY3RpdmU6XG5cdFx0XHRcdGltYWdlOiBudWxsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjNjBDQTExXCJcblx0XHRcdFx0Ym9yZGVyQ29sb3I6IFwiI0ZGRkZGRlwiXG5cdFx0XHRtZXNzZW5nZXI6XG5cdFx0XHRcdGJvcmRlckNvbG9yOiBcIiNGRkZGRkZcIlxuXHRcdFx0XHRpbWFnZTogXCJpbWFnZXMvbWVzc2VuZ2VySWNvbi5wbmdcIlxuXHRcdFx0bXlEYXk6XG5cdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IFwiI0ZGRkZGRlwiXG5cdFx0XHRcdFx0Ym9yZGVyV2lkdGg6IG9wdGlvbnMuc2NhbGUgKiAyXG5cdFx0XHRcdFx0aW1hZ2U6IG51bGxcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzAwNzZGRlwiXG5cblx0XHRALnN1YkxheWVyc1swXS5hbmltYXRlKG9wdGlvbnMuc3RhdHVzKVxuXG5cdGNoYW5nZVN0YXR1czogKHR5cGUpID0+XG5cdFx0QC5zdWJMYXllcnNbMF0uYW5pbWF0ZSh0eXBlKVxuXG5leHBvcnRzLkF2YXRhciA9IEF2YXRhclxuXG5cbiMgTXlEYXlcblxuIyBNeURheXNcblxuY2xhc3MgTXlEYXlzIGV4dGVuZHMgU2Nyb2xsQ29tcG9uZW50XG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30sIHVzZXJzKSAtPlxuXHRcdG9wdGlvbnMuc2NhbGUgPz0gMVxuXHRcdG9wdGlvbnMueCA9IEFsaWduLmNlbnRlclxuXHRcdG9wdGlvbnMud2lkdGggPSBTY3JlZW4ud2lkdGggLSBzdHlsZS5tYXJnaW5zXG5cdFx0b3B0aW9ucy5oZWlnaHQgPSBvcHRpb25zLnNjYWxlICogKDEyNSArIHN0eWxlLm1hcmdpbnMpXG5cdFx0b3B0aW9ucy5zY3JvbGxWZXJ0aWNhbCA9IGZhbHNlXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRmb3IgdXNlciwgaW5kZXggaW4gdXNlcnNcblx0XHRcdG15RGF5ID0gbmV3IEF2YXRhcih7fSwgdXNlcilcblx0XHRcdG15RGF5LnBhcmVudCA9IEAuY29udGVudFxuXHRcdFx0bXlEYXkud2lkdGggPSA5MFxuXHRcdFx0bXlEYXkuaGVpZ2h0ID0gMTI1XG5cdFx0XHRteURheS54ID0gaW5kZXggKiAobXlEYXkud2lkdGggKyBzdHlsZS5tYXJnaW4vMilcblx0XHRcdG15RGF5LnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcdG15RGF5LmJvcmRlclJhZGl1cyA9IDVcblx0XHRcdG15RGF5LnN1YkxheWVyc1swXS53aWR0aCA9IG15RGF5LnN1YkxheWVyc1swXS5oZWlnaHQgPSAxNFxuXHRcdFx0bXlEYXkuc3ViTGF5ZXJzWzBdLnkgPSBBbGlnbi50b3AoLTQpXG5cdFx0XHRteURheS5zdWJMYXllcnNbMF0ueCA9IEFsaWduLnJpZ2h0KDQpXG5cdFx0XHRteURheS5jaGFuZ2VTdGF0dXMoXCJteURheVwiKVxuXG5leHBvcnRzLk15RGF5cyA9IE15RGF5c1xuXG5cbiMgTWVzc2FnZSBMaXN0IEl0ZW1cblxuY2xhc3MgTWVzc2FnZUxpc3RJdGVtIGV4dGVuZHMgTGF5ZXJcblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSwgdXNlcikgLT5cblx0XHRvcHRpb25zLnNjYWxlID89IDFcblx0XHRvcHRpb25zLnggPSBBbGlnbi5jZW50ZXJcblx0XHRvcHRpb25zLndpZHRoID0gU2NyZWVuLndpZHRoIC0gc3R5bGUubWFyZ2luc1xuXHRcdG9wdGlvbnMuaGVpZ2h0ID0gNzQgKiBvcHRpb25zLnNjYWxlXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcblxuXG5cdFx0b3B0aW9ucy5jbGlwID0gdHJ1ZVxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0b3B0aW9ucy5uYW1lID0gdXNlci5maXJzdG5hbWUgKyBcIiBcIiArIHVzZXIubGFzdG5hbWVcblx0XHRvcHRpb25zLmxhc3RNZXNzYWdlID0gdXNlci5tZXNzYWdlVGV4dFxuXHRcdG9wdGlvbnMubGFzdE1lc3NhZ2VUaW1lID0gdXNlci5tZXNzYWdlVGltZVxuXG5cdFx0YXZhdGFyID0gbmV3IEF2YXRhcih7cGFyZW50OiBALCB5OiBzdHlsZS5tYXJnaW4gKiBvcHRpb25zLnNjYWxlIH0sIHVzZXIpXG5cblx0XHRuYW1lID0gbmV3IFRleHRMYXllclxuXHRcdFx0bmFtZTogXCJuYW1lXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogYXZhdGFyLm1heFggKyBvcHRpb25zLnNjYWxlICogMjBcblx0XHRcdHk6IG9wdGlvbnMuaGVpZ2h0IC8gNFxuXHRcdFx0dGV4dDogb3B0aW9ucy5uYW1lXG5cdFx0XHRmb250U2l6ZTogMTcgKiBvcHRpb25zLnNjYWxlXG5cblx0XHRsYXN0TWVzc2FnZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6IFwibGFzdE1lc3NhZ2VcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBuYW1lLnhcblx0XHRcdHk6IG9wdGlvbnMuaGVpZ2h0IC8gMS44XG5cdFx0XHR0ZXh0OiBvcHRpb25zLmxhc3RNZXNzYWdlXG5cdFx0XHRmb250U2l6ZTogMTYgKiBvcHRpb25zLnNjYWxlXG5cdFx0XHR0cnVuY2F0ZSA9IHRydWVcblxuXHRcdGxhc3RNZXNzYWdlVGltZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6IFwibGFzdE1lc3NhZ2VUaW1lXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24ucmlnaHRcblx0XHRcdHk6IG5hbWUueVxuXHRcdFx0Zm9udFNpemU6IDE1ICogb3B0aW9ucy5zY2FsZVxuXHRcdFx0dGV4dDogb3B0aW9ucy5sYXN0TWVzc2FnZVRpbWVcblxuXHRjaGFuZ2VOYW1lOiAobmFtZSkgPT5cblx0XHRALm5hbWUgPSBuYW1lXG5cbmV4cG9ydHMuTWVzc2FnZUxpc3RJdGVtID0gTWVzc2FnZUxpc3RJdGVtXG5cblxuIyBNZXNzYWdlIExpc3RcblxuY2xhc3MgTWVzc2FnZUxpc3QgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSwgdXNlcnMpIC0+XG5cdFx0b3B0aW9ucy5zY2FsZSA/PSAxXG5cdFx0b3B0aW9ucy53aWR0aCA9IFNjcmVlbi53aWR0aCAtIHN0eWxlLm1hcmdpbnNcblx0XHRvcHRpb25zLnggPSBBbGlnbi5jZW50ZXJcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIlxuXHRcdG9wdGlvbnMuaGVpZ2h0ID0gdXNlcnMubGVuZ3RoICogNzQgKiBvcHRpb25zLnNjYWxlXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cblx0XHRmb3IgdXNlciwgaW5kZXggaW4gdXNlcnNcblx0XHRcdG1lc3NhZ2UgPSBuZXcgTWVzc2FnZUxpc3RJdGVtKHtwYXJlbnQ6IEAsIHk6IG9wdGlvbnMuc2NhbGUgKiBpbmRleCAqIDc0fSwgdXNlcilcblxuZXhwb3J0cy5NZXNzYWdlTGlzdCA9IE1lc3NhZ2VMaXN0XG5cbiMgQWN0aXZlIHVzZXJzXG5cbmNsYXNzIEFjdGl2ZUZyaWVuZHNTY3JvbGxMaXN0IGV4dGVuZHMgU2Nyb2xsQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9LCB1c2VycykgLT5cblx0XHRvcHRpb25zLnNjYWxlID89IDFcblx0XHRvcHRpb25zLndpZHRoID0gU2NyZWVuLndpZHRoIC0gc3R5bGUubWFyZ2luc1xuXHRcdG9wdGlvbnMuaGVpZ2h0ID0gb3B0aW9ucy5zY2FsZSAqIDEwMFxuXHRcdG9wdGlvbnMuc2Nyb2xsVmVydGljYWwgPSBmYWxzZVxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cblx0XHRALmNvbnRlbnQuaGVpZ2h0ID0gbnVsbFxuXG5cdFx0Zm9yIHVzZXIsIGluZGV4IGluIHVzZXJzXG5cdFx0XHRjb250YWluZXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBALmNvbnRlbnRcblx0XHRcdFx0eDogaW5kZXggKiAoNTAgKyBzdHlsZS5tYXJnaW4pXG5cdFx0XHRcdHdpZHRoOiA1MFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0YXZhdGFyID0gbmV3IEF2YXRhcih7cGFyZW50OiBjb250YWluZXJ9LCB1c2VyKVxuXHRcdFx0bmFtZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0cGFyZW50OiBjb250YWluZXJcblx0XHRcdFx0dGV4dDogdXNlci5maXJzdG5hbWVcblx0XHRcdFx0Zm9udFNpemU6IDE0ICogb3B0aW9ucy5zY2FsZVxuXHRcdFx0XHR5OiBhdmF0YXIubWF4WSArIDVcblx0XHRcdGNvbnRhaW5lci53aWR0aCA9IGF2YXRhci53aWR0aFxuXHRcdFx0YXZhdGFyLnggPSBuYW1lLnggPSBBbGlnbi5jZW50ZXJcblx0XHRcdEAuY29udGVudC5oZWlnaHQgPSBjb250YWluZXIuaGVpZ2h0ID0gYXZhdGFyLmhlaWdodCArIG5hbWUuaGVpZ2h0ICsgNVxuXHRcdFx0QC5jb250ZW50LnkgPSBBbGlnbi5jZW50ZXJcblxuZXhwb3J0cy5BY3RpdmVGcmllbmRzU2Nyb2xsTGlzdCA9IEFjdGl2ZUZyaWVuZHNTY3JvbGxMaXN0XG5cbmNsYXNzIEFjdGl2ZUZyaWVuZHMgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSwgdXNlcnMpIC0+XG5cdFx0b3B0aW9ucy5zY2FsZSA/PSAxXG5cdFx0b3B0aW9ucy5oZWlnaHQgPSAxNTBcblx0XHRvcHRpb25zLndpZHRoID0gU2NyZWVuLndpZHRoIC0gc3R5bGUubWFyZ2luc1xuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0b3B0aW9ucy54ID0gIEFsaWduLmNlbnRlclxuXHRcdG9wdGlvbnMuZGlyZWN0aW9uTG9jayA9IHRydWVcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRhY3RpdmVGcmllbmRzTGFiZWwgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEAud2lkdGhcblx0XHRcdGhlaWdodDogNTAgKiBvcHRpb25zLnNjYWxlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdGFjdGl2ZUZyaWVuZHNJY29uID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGFjdGl2ZUZyaWVuZHNMYWJlbFxuXHRcdFx0eDogQWxpZ24ubGVmdFxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvYWN0aXZlTm93SWNvbi5wbmdcIlxuXHRcdFx0d2lkdGg6IDIwXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0YWN0aXZlTm93ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBhY3RpdmVGcmllbmRzTGFiZWxcblx0XHRcdHg6IGFjdGl2ZUZyaWVuZHNJY29uLm1heFggKyAxMlxuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRmb250V2VpZ2h0OiBcImJvbGRcIlxuXHRcdFx0Zm9udENvbG9yOiBcImJsYWNrXCJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0dGV4dDogXCJBY3RpdmUgbm93ICgje3VzZXJzLmxlbmd0aH0pID5cIlxuXHRcdGFjdGl2ZU5vd1NldHRpbmdzID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGFjdGl2ZUZyaWVuZHNMYWJlbFxuXHRcdFx0eDogQWxpZ24ucmlnaHRcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2FjdGl2ZU5vd1NldHRpbmdzLnBuZ1wiXG5cdFx0XHR3aWR0aDogMzVcblx0XHRcdGhlaWdodDogMzVcblxuXHRcdHNjcm9sbCA9IG5ldyBBY3RpdmVGcmllbmRzU2Nyb2xsTGlzdCh7cGFyZW50OiBALCB5OiBBbGlnbi5ib3R0b219LCB1c2VycylcblxuXG5leHBvcnRzLkFjdGl2ZUZyaWVuZHMgPSBBY3RpdmVGcmllbmRzXG4iLCJjbGFzcyBVc2Vyc0RBTFxuICAgIHVybCA9IFwiaHR0cHM6Ly9mYnVzZXJzLTQ0OTQucmVzdGRiLmlvL3Jlc3QvZmJ1c2Vyc1wiXG4gICAgYXBpa2V5ID0gXCI1OTU2MzgyZGFmY2UwOWU4NzIxMWU5ODZcIlxuXG4gICAgdXNlcnMgPSBbXVxuXG4gICAgZ2V0VXNlcnM6IChxdWVyeSwgbWF4LCBmaWx0ZXIsIHNvcnQsIHNvcnREaXIpIC0+XG4gICAgICAgIEdFVGRhdGEgPSBcIiN7dXJsfT9hcGlrZXk9I3thcGlrZXl9Jm1heD0je21heH0mc29ydD0je3NvcnR9JmRpcj17c29ydERpcn0mZmlsdGVyPSN7ZmlsdGVyfSZpZHRvbGluaz10cnVlJnE9XCIrSlNPTi5zdHJpbmdpZnkocXVlcnkpXG4gICAgICAgICMgbG9hZCBkYXRhIGZyb20gZGJcbiAgICAgICAgdXNlcnMgPSBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyBHRVRkYXRhXG4gICAgICAgIHJldHVybiB1c2Vyc1xuXG4gICAgZ2V0QWN0aXZlVXNlcnM6ICh1c2VycykgLT5cbiAgICAgICAgYWN0aXZlVXNlcnMgPSBbXVxuICAgICAgICBmb3IgdXNlciBpbiB1c2Vyc1xuXHQgICAgICAgIGlmIHVzZXIuc3RhdHVzIGlzIFwiYWN0aXZlXCJcblx0XHQgICAgICAgIGFjdGl2ZVVzZXJzLnB1c2godXNlcilcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVVzZXJzXG5cbiAgICBnZXRCaXJ0aGRheVVzZXJzOiAodXNlcnMpIC0+XG4gICAgICAgIGJpcnRoZGF5VXNlcnMgPSBbXVxuICAgICAgICBmb3IgdXNlciBpbiB1c2Vyc1xuXHQgICAgICAgIGlmIHVzZXIuYmlydGhkYXkgPT0gdHJ1ZVxuXHRcdCAgICAgICAgYmlydGhkYXlVc2Vycy5wdXNoKHVzZXIpXG4gICAgICAgIHJldHVybiBiaXJ0aGRheVVzZXJzXG5cbiAgICBnZXRGYXZvcml0ZVVzZXJzOiAodXNlcnMpIC0+XG4gICAgICAgIGZhdm9yaXRlVXNlcnMgPSBbXVxuICAgICAgICBmb3IgdXNlciBpbiB1c2Vyc1xuXHQgICAgICAgIGlmIHVzZXIuZmF2b3JpdGUgPT0gdHJ1ZVxuXHRcdCAgICAgICAgZmF2b3JpdGVVc2Vycy5wdXNoKHVzZXIpXG4gICAgICAgIHJldHVybiBmYXZvcml0ZVVzZXJzXG5cbiAgICBnZXRNeURheXM6ICh1c2VycykgLT5cbiAgICAgICAgbXlEYXlzID0gW11cbiAgICAgICAgZm9yIHVzZXIgaW4gdXNlcnNcblx0ICAgICAgICBpZiB1c2VyLm15RGF5ID09IHRydWVcblx0XHQgICAgICAgIG15RGF5cy5wdXNoKHVzZXIpXG4gICAgICAgIHJldHVybiBteURheXNcblxuICAgIG1vZHVsZS5leHBvcnRzID0gVXNlcnNEQUxcblxuY2xhc3MgQ2FsbHNEQUxcbiAgICB1cmwgPSBcImh0dHBzOi8vZmJ1c2Vycy00NDk0LnJlc3RkYi5pby9yZXN0L2NhbGxzXCJcbiAgICBhcGlrZXkgPSBcIjhiZTBkMjc3NzZkYWI5NDgzYWNmZmJlOTcxNWVlMDI1MTJiZTNcIlxuXG4gICAgY2FsbHMgPSBbXVxuXG4gICAgZ2V0Q2FsbHM6IChxdWVyeSwgbWF4LCBmaWx0ZXIsIHNvcnQsIHNvcnREaXIpIC0+XG4gICAgICAgIEdFVGRhdGEgPSBcIiN7dXJsfT9hcGlrZXk9I3thcGlrZXl9Jm1heD0je21heH0mc29ydD0je3NvcnR9JmRpcj17c29ydERpcn0mZmlsdGVyPSN7ZmlsdGVyfSZpZHRvbGluaz10cnVlJnE9XCIrSlNPTi5zdHJpbmdpZnkocXVlcnkpXG4gICAgICAgICMgbG9hZCBkYXRhIGZyb20gZGJcbiAgICAgICAgdXNlcnMgPSBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyBHRVRkYXRhXG4gICAgICAgIHJldHVybiBjYWxsc1xuXG4gICAgbW9kdWxlLmV4cG9ydHMgQ2FsbHNEQUxcbiIsIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBDcmVhdGVkIG9uIDIzIERFQyAyMDE1IGJ5IEpvcmRhbiBEb2Jzb24gLyBAam9yZGFuZG9ic29uIC8gam9yZGFuQGJyb3RoZS5yc1xuIyBVcGRhdGVkIG9uIDEyIEFQUiAyMDE2IGJ5IEpvcmRhbiBEb2Jzb24gd2l0aCB0aGFua3MgdG8gTmlrb2xheSBCZXJlem92c2tpeSFcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuI1xuIyBVc2UgdG8gbWVhc3VyZSBwaXhlbHMgYXQgMXggYW5kIGhhdmUgaXQgYWRqdXN0IGZvciB0aGUgUGl4ZWwgUmF0aW9cbiNcbiMgVG8gR2V0IFN0YXJ0ZWQuLi5cbiNcbiMgIDEuIFBsYWNlIHRoaXMgZmlsZSBpbiBGcmFtZXIgU3R1ZGlvIG1vZHVsZXMgZGlyZWN0b3J5XG4jXG4jICAyLiBJbiB5b3VyIHByb2plY3QgaW5jbHVkZTpcbiNcbiMgICAgIHtkcHJ9ID0gcmVxdWlyZSAnRGV2aWNlUGl4ZWxSYXRpbydcbiNcbiMgIDMuIFdoZW4geW91IGNyZWF0ZSBhIGxheWVyIGRvIHNvIEAgMXggYW5kIGFkZCB0aGUgZHByIGZ1bmN0aW9uIHRvIHRoZSB2YWx1ZVxuI1xuIyAgICAgcmVjdCA9IG5ldyBMYXllclxuIyAgICAgICB3aWR0aDogIGRwcigzMDApXG4jICAgICAgIGhlaWdodDogZHByIDUwXG4jICAgICAgIHg6ICAgICAgKGRwciAxNilcbiMgXG4jICA0LiBVc2UgaXQgZm9yIG1vcmUgdGhhbiBsYXllciBzaXplLiBIZXJlJ3MgYWR2YW5jZWQgdXNhZ2UgZm9yIG11bHRpIGRldmljZXM6XG4jXG4jXHRcdFx0IyBBZGQgYSBsaXN0IHJvdyB3LyB0aGUgaGVpZ2h0ICYgdGV4dCBzaXppbmcvbGF5b3V0IHVzaW5nIGRwcigpXG4jXG4jICAgICBsaXN0Um93ID0gbmV3IExheWVyXG4jICAgICAgIHdpZHRoOiBTY3JlZW4ud2lkdGhcbiMgICAgICAgaGVpZ2h0OiBkcHIgNDRcbiMgICAgICAgaHRtbDogXCJMaXN0IEl0ZW1cIlxuIyAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiXG4jICAgICAgIGNvbG9yOiBcIiMwMDBcIlxuIyAgICAgICBzdHlsZTogXG4jICAgICAgICAgZm9udDogXCI0MDAgI3tkcHIgMTR9cHgvI3tkcHIgNDJ9cHggLWFwcGxlLXN5c3RlbSwgSGVsdmV0aWNhIE5ldWVcIlxuIyAgICAgICAgIHRleHRJbmRlbnQ6IFwiI3tkcHIgMTV9cHhcIlxuI1xuIyBcdFx0IyBBZGQgYSBjaGV2cm9uIHdpdGggdGhlIHNpemUsIHJpZ2h0IG1hcmdpbiAmIHNoYWRvdyBzdHJva2UgdXNpbmcgZHByKClcbiMgICAgIFxuIyAgICAgbGlzdENoZXZyb24gPSBuZXcgTGF5ZXJcbiMgICAgIFx0c3VwZXJMYXllcjogbGlzdFJvd1xuIyAgICAgXHR3aWR0aDogIGRwciA5XG4jICAgICBcdGhlaWdodDogZHByIDlcbiMgICAgIFx0bWF4WDogbGlzdFJvdy53aWR0aCAtIGRwciAxNVxuIyAgICAgXHR5OiAgICBsaXN0Um93LmhlaWdodCAvIDJcbiMgICAgIFx0b3JpZ2luWDogMVxuIyAgICAgXHRvcmlnaW5ZOiAwXG4jICAgICBcdHJvdGF0aW9uOiA0NVxuIyAgICAgXHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcbiMgICAgIFx0c3R5bGU6XG4jICAgICBcdFx0Ym94U2hhZG93OiBcImluc2V0IC0je2RwciAyfXB4ICN7ZHByIDJ9cHggMCAjQkNCQ0MxXCJcbiNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5jbGFzcyBleHBvcnRzLkRldmljZVBpeGVsUmF0aW9cblxuXHQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHQjIFByaXZhdGUgTWV0aG9kcyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHRcblx0bG9nID0gKHYpIC0+XG5cdFx0Y29uc29sZS5sb2cgXCJEZXZpY2VQaXhlbFJhdGlvIHNldCBhczpcIiwgdlxuXHRcdHJldHVybiB2XG5cblx0ZHByID0gKCkgLT5cblx0XHRpbml0aWFsVmFsdWUgPSAxXG5cdFx0dmFsdWUgPSBpbml0aWFsVmFsdWVcblx0XHQjIENoZWNrIGlmIGluIFN0dWRpbyBvciBEZXNrdG9wIHRvIGZpZ3VyZSBvdXQgd2hhdCB0aGUgc2NhbGluZyBzaG91bGQgYmVcblx0XHRpZiBVdGlscy5pc0ZyYW1lclN0dWRpbygpIG9yIFV0aWxzLmlzRGVza3RvcCgpXG5cblx0XHRcdCMgQ2hlY2sgZm9yIDJ4IGRldmljZXMgXG5cdFx0XHRmb3IgZGV2aWNlXzJ4IGluIFsnYXBwbGUtJywgJ2dvb2dsZS1uZXh1cy0nLCAnaXBob25lLTYtJywgJ2lwaG9uZS01JywgJ2lwYWQtYWlyJywgJ25leHVzLTknLCAnYXBwbGV3YXRjaCddXG5cdFx0XHRcdHZhbHVlID0gMiBpZiBfLnN0YXJ0c1dpdGgoRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlLCBkZXZpY2VfMngpXG5cblx0XHRcdCMgQ2hlY2sgZm9yIDN4IGRldmljZXNcblx0XHRcdGZvciBkZXZpY2VfM3ggaW4gWydhcHBsZS1pcGhvbmUtNnMtcGx1cycsICdnb29nbGUtbmV4dXMtNScsICdodGMtb25lLScsICdtaWNyb3NvZnQtbHVtaWEtJywgJ3NhbXN1bmctZ2FsYXh5LW5vdGUtJywgJ2lwaG9uZS02cGx1cycsICduZXh1cy01J11cblx0XHRcdFx0dmFsdWUgPSAzIGlmIF8uc3RhcnRzV2l0aChGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUsIGRldmljZV8zeClcblx0XHRcdFx0XG5cdFx0XHQjIENoZWNrIGZvciAzLjV4IGRldmljZXNcblx0XHRcdGZvciBkZXZpY2VfM3A1eCBpbiBbJ2dvb2dsZS1uZXh1cy02J11cblx0XHRcdFx0dmFsdWUgPSAzLjUgaWYgXy5zdGFydHNXaXRoKEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSwgZGV2aWNlXzNwNXgpXG5cblx0XHQjIFJldHVybiBpZiB0aGUgdmFsdWUgY2hhbmdlZC4uLiBvdGhlcndpc2UgY29udGludWVcblx0XHRyZXR1cm4gbG9nIHZhbHVlIHVubGVzcyB2YWx1ZSBpcyBpbml0aWFsVmFsdWVcblx0XHRcblx0XHQjIFNldCBVbml0cyBiYXNlZCBvbiBEZXZpY2UgUGl4ZWwgUmF0aW8gRXhjZXB0IGZvciBEZXNrdG9wXG5cdFx0dW5sZXNzIFV0aWxzLmlzRGVza3RvcCgpXG5cdFx0XHRkZXZpY2VQaXhlbFJhdGlvID0gVXRpbHMuZGV2aWNlUGl4ZWxSYXRpbygpXG5cdFx0XHQjIGlmIGl0J3MgZ3JlYXRlciB0aGFuIDEgdGhlbiB1cGRhdGUgaXQhXG5cdFx0XHR2YWx1ZSA9IGRldmljZVBpeGVsUmF0aW8gaWYgZGV2aWNlUGl4ZWxSYXRpbyA+IGluaXRpYWxWYWx1ZVxuXG5cdFx0IyByZXR1cm4gdGhlIHZhbHVlIGV2ZW4gaWYgaXQgaGFzbid0IGNoYW5nZWQgYW5kIGxvZyBpdCBldmVyeXRpbWUgaXRzIHNldFxuXHRcdHJldHVybiBsb2cgdmFsdWVcblx0XHRcblx0IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0IyBDb25zdGFudCAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0XG5cdFZBTFVFID0gZHByKClcblxuXHQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHQjIFB1YmxpYyBNZXRob2RzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHRcblx0QC5jYWxjICA9ICh2KSAtPiByZXR1cm4gdiAqIFZBTFVFXG5cdFxuXHRALnZhbHVlID0gVkFMVUVcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgQ3JlYXRlIGEgc2hvcnRoYW5kIHRvIGdldCBkaXJlY3RseSB0byB0aGUgY2FsYyBzdGF0ZW1lbnRcblxuZXhwb3J0cy5kcHIgPSBleHBvcnRzLkRldmljZVBpeGVsUmF0aW8uY2FsY1xuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFJQUE7QURxRE0sT0FBTyxDQUFDO0FBS2IsTUFBQTs7OztFQUFBLEdBQUEsR0FBTSxTQUFDLENBQUQ7SUFDTCxPQUFPLENBQUMsR0FBUixDQUFZLDBCQUFaLEVBQXdDLENBQXhDO0FBQ0EsV0FBTztFQUZGOztFQUlOLEdBQUEsR0FBTSxTQUFBO0FBQ0wsUUFBQTtJQUFBLFlBQUEsR0FBZTtJQUNmLEtBQUEsR0FBUTtJQUVSLElBQUcsS0FBSyxDQUFDLGNBQU4sQ0FBQSxDQUFBLElBQTBCLEtBQUssQ0FBQyxTQUFOLENBQUEsQ0FBN0I7QUFHQztBQUFBLFdBQUEscUNBQUE7O1FBQ0MsSUFBYSxDQUFDLENBQUMsVUFBRixDQUFhLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBM0IsRUFBdUMsU0FBdkMsQ0FBYjtVQUFBLEtBQUEsR0FBUSxFQUFSOztBQUREO0FBSUE7QUFBQSxXQUFBLHdDQUFBOztRQUNDLElBQWEsQ0FBQyxDQUFDLFVBQUYsQ0FBYSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQTNCLEVBQXVDLFNBQXZDLENBQWI7VUFBQSxLQUFBLEdBQVEsRUFBUjs7QUFERDtBQUlBO0FBQUEsV0FBQSx3Q0FBQTs7UUFDQyxJQUFlLENBQUMsQ0FBQyxVQUFGLENBQWEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUEzQixFQUF1QyxXQUF2QyxDQUFmO1VBQUEsS0FBQSxHQUFRLElBQVI7O0FBREQsT0FYRDs7SUFlQSxJQUF3QixLQUFBLEtBQVMsWUFBakM7QUFBQSxhQUFPLEdBQUEsQ0FBSSxLQUFKLEVBQVA7O0lBR0EsSUFBQSxDQUFPLEtBQUssQ0FBQyxTQUFOLENBQUEsQ0FBUDtNQUNDLGdCQUFBLEdBQW1CLEtBQUssQ0FBQyxnQkFBTixDQUFBO01BRW5CLElBQTRCLGdCQUFBLEdBQW1CLFlBQS9DO1FBQUEsS0FBQSxHQUFRLGlCQUFSO09BSEQ7O0FBTUEsV0FBTyxHQUFBLENBQUksS0FBSjtFQTVCRjs7RUFpQ04sS0FBQSxHQUFRLEdBQUEsQ0FBQTs7RUFLUixnQkFBQyxDQUFDLElBQUYsR0FBVSxTQUFDLENBQUQ7QUFBTyxXQUFPLENBQUEsR0FBSTtFQUFsQjs7RUFFVixnQkFBQyxDQUFDLEtBQUYsR0FBVTs7Ozs7O0FBS1gsT0FBTyxDQUFDLEdBQVIsR0FBYyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7Ozs7QUQzR3ZDLElBQUE7O0FBQU07QUFDRixNQUFBOzs7O0VBQUEsR0FBQSxHQUFNOztFQUNOLE1BQUEsR0FBUzs7RUFFVCxLQUFBLEdBQVE7O3FCQUVSLFFBQUEsR0FBVSxTQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEsTUFBYixFQUFxQixJQUFyQixFQUEyQixPQUEzQjtBQUNOLFFBQUE7SUFBQSxPQUFBLEdBQVUsQ0FBRyxHQUFELEdBQUssVUFBTCxHQUFlLE1BQWYsR0FBc0IsT0FBdEIsR0FBNkIsR0FBN0IsR0FBaUMsUUFBakMsR0FBeUMsSUFBekMsR0FBOEMsd0JBQTlDLEdBQXNFLE1BQXRFLEdBQTZFLG1CQUEvRSxDQUFBLEdBQWtHLElBQUksQ0FBQyxTQUFMLENBQWUsS0FBZjtJQUU1RyxLQUFBLEdBQVEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxLQUFLLENBQUMsZUFBTixDQUFzQixPQUF0QixDQUFYO0FBQ1IsV0FBTztFQUpEOztxQkFNVixjQUFBLEdBQWdCLFNBQUMsS0FBRDtBQUNaLFFBQUE7SUFBQSxXQUFBLEdBQWM7QUFDZCxTQUFBLHVDQUFBOztNQUNDLElBQUcsSUFBSSxDQUFDLE1BQUwsS0FBZSxRQUFsQjtRQUNDLFdBQVcsQ0FBQyxJQUFaLENBQWlCLElBQWpCLEVBREQ7O0FBREQ7QUFHQSxXQUFPO0VBTEs7O3FCQU9oQixnQkFBQSxHQUFrQixTQUFDLEtBQUQ7QUFDZCxRQUFBO0lBQUEsYUFBQSxHQUFnQjtBQUNoQixTQUFBLHVDQUFBOztNQUNDLElBQUcsSUFBSSxDQUFDLFFBQUwsS0FBaUIsSUFBcEI7UUFDQyxhQUFhLENBQUMsSUFBZCxDQUFtQixJQUFuQixFQUREOztBQUREO0FBR0EsV0FBTztFQUxPOztxQkFPbEIsZ0JBQUEsR0FBa0IsU0FBQyxLQUFEO0FBQ2QsUUFBQTtJQUFBLGFBQUEsR0FBZ0I7QUFDaEIsU0FBQSx1Q0FBQTs7TUFDQyxJQUFHLElBQUksQ0FBQyxRQUFMLEtBQWlCLElBQXBCO1FBQ0MsYUFBYSxDQUFDLElBQWQsQ0FBbUIsSUFBbkIsRUFERDs7QUFERDtBQUdBLFdBQU87RUFMTzs7cUJBT2xCLFNBQUEsR0FBVyxTQUFDLEtBQUQ7QUFDUCxRQUFBO0lBQUEsTUFBQSxHQUFTO0FBQ1QsU0FBQSx1Q0FBQTs7TUFDQyxJQUFHLElBQUksQ0FBQyxLQUFMLEtBQWMsSUFBakI7UUFDQyxNQUFNLENBQUMsSUFBUCxDQUFZLElBQVosRUFERDs7QUFERDtBQUdBLFdBQU87RUFMQTs7RUFPWCxNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7O0FBRWY7QUFDRixNQUFBOzs7O0VBQUEsR0FBQSxHQUFNOztFQUNOLE1BQUEsR0FBUzs7RUFFVCxLQUFBLEdBQVE7O3FCQUVSLFFBQUEsR0FBVSxTQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEsTUFBYixFQUFxQixJQUFyQixFQUEyQixPQUEzQjtBQUNOLFFBQUE7SUFBQSxPQUFBLEdBQVUsQ0FBRyxHQUFELEdBQUssVUFBTCxHQUFlLE1BQWYsR0FBc0IsT0FBdEIsR0FBNkIsR0FBN0IsR0FBaUMsUUFBakMsR0FBeUMsSUFBekMsR0FBOEMsd0JBQTlDLEdBQXNFLE1BQXRFLEdBQTZFLG1CQUEvRSxDQUFBLEdBQWtHLElBQUksQ0FBQyxTQUFMLENBQWUsS0FBZjtJQUU1RyxLQUFBLEdBQVEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxLQUFLLENBQUMsZUFBTixDQUFzQixPQUF0QixDQUFYO0FBQ1IsV0FBTztFQUpEOztFQU1WLE1BQU0sQ0FBQyxPQUFQLENBQWUsUUFBZjs7Ozs7Ozs7QUR0REosSUFBQSxrR0FBQTtFQUFBOzs7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxrQkFBUjs7QUFJUixLQUFBLEdBQ0M7RUFBQSxNQUFBLEVBQVEsRUFBUjtFQUNBLE9BQUEsRUFBUyxFQURUO0VBRUEsU0FBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLEVBQU47SUFDQSxXQUFBLEVBQWEsRUFEYjtJQUVBLFdBQUEsRUFBYSxFQUZiO0dBSEQ7RUFNQSxXQUFBLEVBQWEsRUFOYjs7O0FBUUQsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBSVY7OztFQUVRLGdCQUFDLE9BQUQsRUFBZSxJQUFmO0FBQ1osUUFBQTs7TUFEYSxVQUFVOzs7O01BQ3ZCLE9BQU8sQ0FBQyxRQUFTOztJQUNqQixPQUFPLENBQUMsS0FBUixHQUFnQixPQUFPLENBQUMsTUFBUixHQUFpQixFQUFBLEdBQUssT0FBTyxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxlQUFSLEdBQTBCO0lBQzFCLE9BQU8sQ0FBQyxZQUFSLEdBQXVCOztNQUV2QixPQUFPLENBQUMsUUFBUyxJQUFJLENBQUM7OztNQUN0QixPQUFPLENBQUMsU0FBVSxJQUFJLENBQUM7O0lBRXZCLHdDQUFNLE9BQU47SUFHQSxJQUFBLEdBQVcsSUFBQSxLQUFBLENBQ1Y7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsS0FEVDtNQUVBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFGVDtNQUdBLEtBQUEsRUFBTyxFQUFBLEdBQUcsR0FBSCxHQUFTLElBQUMsQ0FBQyxLQUhsQjtNQUlBLE1BQUEsRUFBUSxFQUFBLEdBQUcsR0FBSCxHQUFTLElBQUMsQ0FBQyxNQUpuQjtNQUtBLFlBQUEsRUFBYyxHQUxkO01BTUEsZUFBQSxFQUFpQixhQU5qQjtNQU9BLFdBQUEsRUFBYSxDQUFBLEdBQUksT0FBTyxDQUFDLEtBUHpCO0tBRFU7SUFVWCxJQUFJLENBQUMsTUFBTCxHQUNDO01BQUEsUUFBQSxFQUNDO1FBQUEsV0FBQSxFQUFhLENBQWI7UUFDQSxlQUFBLEVBQWlCLGFBRGpCO1FBRUEsS0FBQSxFQUFPLElBRlA7T0FERDtNQUlBLE1BQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxJQUFQO1FBQ0EsZUFBQSxFQUFpQixTQURqQjtRQUVBLFdBQUEsRUFBYSxTQUZiO09BTEQ7TUFRQSxTQUFBLEVBQ0M7UUFBQSxXQUFBLEVBQWEsU0FBYjtRQUNBLEtBQUEsRUFBTywwQkFEUDtPQVREO01BV0EsS0FBQSxFQUNFO1FBQUEsV0FBQSxFQUFhLFNBQWI7UUFDQSxXQUFBLEVBQWEsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsQ0FEN0I7UUFFQSxLQUFBLEVBQU8sSUFGUDtRQUdBLGVBQUEsRUFBaUIsU0FIakI7T0FaRjs7SUFpQkQsSUFBQyxDQUFDLFNBQVUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFmLENBQXVCLE9BQU8sQ0FBQyxNQUEvQjtFQXhDWTs7bUJBMENiLFlBQUEsR0FBYyxTQUFDLElBQUQ7V0FDYixJQUFDLENBQUMsU0FBVSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQWYsQ0FBdUIsSUFBdkI7RUFEYTs7OztHQTVDTTs7QUErQ3JCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCOztBQU9YOzs7RUFFUSxnQkFBQyxPQUFELEVBQWUsS0FBZjtBQUNaLFFBQUE7O01BRGEsVUFBVTs7O01BQ3ZCLE9BQU8sQ0FBQyxRQUFTOztJQUNqQixPQUFPLENBQUMsQ0FBUixHQUFZLEtBQUssQ0FBQztJQUNsQixPQUFPLENBQUMsS0FBUixHQUFnQixNQUFNLENBQUMsS0FBUCxHQUFlLEtBQUssQ0FBQztJQUNyQyxPQUFPLENBQUMsTUFBUixHQUFpQixPQUFPLENBQUMsS0FBUixHQUFnQixDQUFDLEdBQUEsR0FBTSxLQUFLLENBQUMsT0FBYjtJQUNqQyxPQUFPLENBQUMsY0FBUixHQUF5QjtJQUV6Qix3Q0FBTSxPQUFOO0FBRUEsU0FBQSx1REFBQTs7TUFDQyxLQUFBLEdBQVksSUFBQSxNQUFBLENBQU8sRUFBUCxFQUFXLElBQVg7TUFDWixLQUFLLENBQUMsTUFBTixHQUFlLElBQUMsQ0FBQztNQUNqQixLQUFLLENBQUMsS0FBTixHQUFjO01BQ2QsS0FBSyxDQUFDLE1BQU4sR0FBZTtNQUNmLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBQSxHQUFRLENBQUMsS0FBSyxDQUFDLEtBQU4sR0FBYyxLQUFLLENBQUMsTUFBTixHQUFhLENBQTVCO01BQ2xCLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDO01BQ2hCLEtBQUssQ0FBQyxZQUFOLEdBQXFCO01BQ3JCLEtBQUssQ0FBQyxTQUFVLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBbkIsR0FBMkIsS0FBSyxDQUFDLFNBQVUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFuQixHQUE0QjtNQUN2RCxLQUFLLENBQUMsU0FBVSxDQUFBLENBQUEsQ0FBRSxDQUFDLENBQW5CLEdBQXVCLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBQyxDQUFYO01BQ3ZCLEtBQUssQ0FBQyxTQUFVLENBQUEsQ0FBQSxDQUFFLENBQUMsQ0FBbkIsR0FBdUIsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaO01BQ3ZCLEtBQUssQ0FBQyxZQUFOLENBQW1CLE9BQW5CO0FBWEQ7RUFUWTs7OztHQUZPOztBQXdCckIsT0FBTyxDQUFDLE1BQVIsR0FBaUI7O0FBS1g7OztFQUVRLHlCQUFDLE9BQUQsRUFBZSxJQUFmO0FBQ1osUUFBQTs7TUFEYSxVQUFVOzs7O01BQ3ZCLE9BQU8sQ0FBQyxRQUFTOztJQUNqQixPQUFPLENBQUMsQ0FBUixHQUFZLEtBQUssQ0FBQztJQUNsQixPQUFPLENBQUMsS0FBUixHQUFnQixNQUFNLENBQUMsS0FBUCxHQUFlLEtBQUssQ0FBQztJQUNyQyxPQUFPLENBQUMsTUFBUixHQUFpQixFQUFBLEdBQUssT0FBTyxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxlQUFSLEdBQTBCO0lBRzFCLE9BQU8sQ0FBQyxJQUFSLEdBQWU7SUFFZixpREFBTSxPQUFOO0lBRUEsT0FBTyxDQUFDLElBQVIsR0FBZSxJQUFJLENBQUMsU0FBTCxHQUFpQixHQUFqQixHQUF1QixJQUFJLENBQUM7SUFDM0MsT0FBTyxDQUFDLFdBQVIsR0FBc0IsSUFBSSxDQUFDO0lBQzNCLE9BQU8sQ0FBQyxlQUFSLEdBQTBCLElBQUksQ0FBQztJQUUvQixNQUFBLEdBQWEsSUFBQSxNQUFBLENBQU87TUFBQyxNQUFBLEVBQVEsSUFBVDtNQUFZLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixHQUFlLE9BQU8sQ0FBQyxLQUF0QztLQUFQLEVBQXNELElBQXREO0lBRWIsSUFBQSxHQUFXLElBQUEsU0FBQSxDQUNWO01BQUEsSUFBQSxFQUFNLE1BQU47TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLENBQUEsRUFBRyxNQUFNLENBQUMsSUFBUCxHQUFjLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLEVBRmpDO01BR0EsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLENBSHBCO01BSUEsSUFBQSxFQUFNLE9BQU8sQ0FBQyxJQUpkO01BS0EsUUFBQSxFQUFVLEVBQUEsR0FBSyxPQUFPLENBQUMsS0FMdkI7S0FEVTtJQVFYLFdBQUEsR0FBa0IsSUFBQSxTQUFBLENBQ2pCO01BQUEsSUFBQSxFQUFNLGFBQU47TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLENBQUEsRUFBRyxJQUFJLENBQUMsQ0FGUjtNQUdBLENBQUEsRUFBRyxPQUFPLENBQUMsTUFBUixHQUFpQixHQUhwQjtNQUlBLElBQUEsRUFBTSxPQUFPLENBQUMsV0FKZDtNQUtBLFFBQUEsRUFBVSxFQUFBLEdBQUssT0FBTyxDQUFDLEtBTHZCO0tBRGlCLEVBT2pCLFFBQUEsR0FBVyxJQVBNO0lBU2xCLGVBQUEsR0FBc0IsSUFBQSxTQUFBLENBQ3JCO01BQUEsSUFBQSxFQUFNLGlCQUFOO01BQ0EsTUFBQSxFQUFRLElBRFI7TUFFQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBRlQ7TUFHQSxDQUFBLEVBQUcsSUFBSSxDQUFDLENBSFI7TUFJQSxRQUFBLEVBQVUsRUFBQSxHQUFLLE9BQU8sQ0FBQyxLQUp2QjtNQUtBLElBQUEsRUFBTSxPQUFPLENBQUMsZUFMZDtLQURxQjtFQW5DVjs7NEJBMkNiLFVBQUEsR0FBWSxTQUFDLElBQUQ7V0FDWCxJQUFDLENBQUMsSUFBRixHQUFTO0VBREU7Ozs7R0E3Q2lCOztBQWdEOUIsT0FBTyxDQUFDLGVBQVIsR0FBMEI7O0FBS3BCOzs7RUFDUSxxQkFBQyxPQUFELEVBQWUsS0FBZjtBQUNaLFFBQUE7O01BRGEsVUFBVTs7O01BQ3ZCLE9BQU8sQ0FBQyxRQUFTOztJQUNqQixPQUFPLENBQUMsS0FBUixHQUFnQixNQUFNLENBQUMsS0FBUCxHQUFlLEtBQUssQ0FBQztJQUNyQyxPQUFPLENBQUMsQ0FBUixHQUFZLEtBQUssQ0FBQztJQUNsQixPQUFPLENBQUMsZUFBUixHQUEwQjtJQUMxQixPQUFPLENBQUMsTUFBUixHQUFpQixLQUFLLENBQUMsTUFBTixHQUFlLEVBQWYsR0FBb0IsT0FBTyxDQUFDO0lBQzdDLDZDQUFNLE9BQU47QUFHQSxTQUFBLHVEQUFBOztNQUNDLE9BQUEsR0FBYyxJQUFBLGVBQUEsQ0FBZ0I7UUFBQyxNQUFBLEVBQVEsSUFBVDtRQUFZLENBQUEsRUFBRyxPQUFPLENBQUMsS0FBUixHQUFnQixLQUFoQixHQUF3QixFQUF2QztPQUFoQixFQUE0RCxJQUE1RDtBQURmO0VBVFk7Ozs7R0FEWTs7QUFhMUIsT0FBTyxDQUFDLFdBQVIsR0FBc0I7O0FBSWhCOzs7RUFDUSxpQ0FBQyxPQUFELEVBQWUsS0FBZjtBQUNaLFFBQUE7O01BRGEsVUFBVTs7O01BQ3ZCLE9BQU8sQ0FBQyxRQUFTOztJQUNqQixPQUFPLENBQUMsS0FBUixHQUFnQixNQUFNLENBQUMsS0FBUCxHQUFlLEtBQUssQ0FBQztJQUNyQyxPQUFPLENBQUMsTUFBUixHQUFpQixPQUFPLENBQUMsS0FBUixHQUFnQjtJQUNqQyxPQUFPLENBQUMsY0FBUixHQUF5QjtJQUV6Qix5REFBTSxPQUFOO0lBR0EsSUFBQyxDQUFDLE9BQU8sQ0FBQyxNQUFWLEdBQW1CO0FBRW5CLFNBQUEsdURBQUE7O01BQ0MsU0FBQSxHQUFnQixJQUFBLEtBQUEsQ0FDZjtRQUFBLE1BQUEsRUFBUSxJQUFDLENBQUMsT0FBVjtRQUNBLENBQUEsRUFBRyxLQUFBLEdBQVEsQ0FBQyxFQUFBLEdBQUssS0FBSyxDQUFDLE1BQVosQ0FEWDtRQUVBLEtBQUEsRUFBTyxFQUZQO1FBR0EsZUFBQSxFQUFpQixhQUhqQjtPQURlO01BS2hCLE1BQUEsR0FBYSxJQUFBLE1BQUEsQ0FBTztRQUFDLE1BQUEsRUFBUSxTQUFUO09BQVAsRUFBNEIsSUFBNUI7TUFDYixJQUFBLEdBQVcsSUFBQSxTQUFBLENBQ1Y7UUFBQSxNQUFBLEVBQVEsU0FBUjtRQUNBLElBQUEsRUFBTSxJQUFJLENBQUMsU0FEWDtRQUVBLFFBQUEsRUFBVSxFQUFBLEdBQUssT0FBTyxDQUFDLEtBRnZCO1FBR0EsQ0FBQSxFQUFHLE1BQU0sQ0FBQyxJQUFQLEdBQWMsQ0FIakI7T0FEVTtNQUtYLFNBQVMsQ0FBQyxLQUFWLEdBQWtCLE1BQU0sQ0FBQztNQUN6QixNQUFNLENBQUMsQ0FBUCxHQUFXLElBQUksQ0FBQyxDQUFMLEdBQVMsS0FBSyxDQUFDO01BQzFCLElBQUMsQ0FBQyxPQUFPLENBQUMsTUFBVixHQUFtQixTQUFTLENBQUMsTUFBVixHQUFtQixNQUFNLENBQUMsTUFBUCxHQUFnQixJQUFJLENBQUMsTUFBckIsR0FBOEI7TUFDcEUsSUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFWLEdBQWMsS0FBSyxDQUFDO0FBZnJCO0VBWFk7Ozs7R0FEd0I7O0FBNkJ0QyxPQUFPLENBQUMsdUJBQVIsR0FBa0M7O0FBRTVCOzs7RUFDUSx1QkFBQyxPQUFELEVBQWUsS0FBZjtBQUNaLFFBQUE7O01BRGEsVUFBVTs7O01BQ3ZCLE9BQU8sQ0FBQyxRQUFTOztJQUNqQixPQUFPLENBQUMsTUFBUixHQUFpQjtJQUNqQixPQUFPLENBQUMsS0FBUixHQUFnQixNQUFNLENBQUMsS0FBUCxHQUFlLEtBQUssQ0FBQztJQUNyQyxPQUFPLENBQUMsZUFBUixHQUEwQjtJQUMxQixPQUFPLENBQUMsQ0FBUixHQUFhLEtBQUssQ0FBQztJQUNuQixPQUFPLENBQUMsYUFBUixHQUF3QjtJQUN4QiwrQ0FBTSxPQUFOO0lBRUEsa0JBQUEsR0FBeUIsSUFBQSxLQUFBLENBQ3hCO01BQUEsTUFBQSxFQUFRLElBQVI7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFDLEtBRFQ7TUFFQSxNQUFBLEVBQVEsRUFBQSxHQUFLLE9BQU8sQ0FBQyxLQUZyQjtNQUdBLGVBQUEsRUFBaUIsYUFIakI7S0FEd0I7SUFLekIsaUJBQUEsR0FBd0IsSUFBQSxLQUFBLENBQ3ZCO01BQUEsTUFBQSxFQUFRLGtCQUFSO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQURUO01BRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUZUO01BR0EsS0FBQSxFQUFPLDBCQUhQO01BSUEsS0FBQSxFQUFPLEVBSlA7TUFLQSxNQUFBLEVBQVEsRUFMUjtLQUR1QjtJQU94QixTQUFBLEdBQWdCLElBQUEsU0FBQSxDQUNmO01BQUEsTUFBQSxFQUFRLGtCQUFSO01BQ0EsQ0FBQSxFQUFHLGlCQUFpQixDQUFDLElBQWxCLEdBQXlCLEVBRDVCO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFHQSxVQUFBLEVBQVksTUFIWjtNQUlBLFNBQUEsRUFBVyxPQUpYO01BS0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUxUO01BTUEsSUFBQSxFQUFNLGNBQUEsR0FBZSxLQUFLLENBQUMsTUFBckIsR0FBNEIsS0FObEM7S0FEZTtJQVFoQixpQkFBQSxHQUF3QixJQUFBLEtBQUEsQ0FDdkI7TUFBQSxNQUFBLEVBQVEsa0JBQVI7TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBRFQ7TUFFQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRlQ7TUFHQSxLQUFBLEVBQU8sOEJBSFA7TUFJQSxLQUFBLEVBQU8sRUFKUDtNQUtBLE1BQUEsRUFBUSxFQUxSO0tBRHVCO0lBUXhCLE1BQUEsR0FBYSxJQUFBLHVCQUFBLENBQXdCO01BQUMsTUFBQSxFQUFRLElBQVQ7TUFBWSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQXJCO0tBQXhCLEVBQXNELEtBQXREO0VBckNEOzs7O0dBRGM7O0FBeUM1QixPQUFPLENBQUMsYUFBUixHQUF3Qjs7OztBRDlPeEIsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCJ9
