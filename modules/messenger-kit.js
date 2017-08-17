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
      options.image = "images/meIconActive.png";
    }
    if (options.status == null) {
      options.status = "inactive";
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

  Avatar.prototype.setUser = function(user) {
    this.image = user.image_0;
    return this.status = user.status;
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
    options.directionLock = true;
    MyDays.__super__.constructor.call(this, options);
    for (index = i = 0, len = users.length; i < len; index = ++i) {
      user = users[index];
      myDay = new Avatar({});
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
      myDay.setUser(user);
    }
  }

  return MyDays;

})(ScrollComponent);

exports.MyDays = MyDays;

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
    });
    avatar.setUser(user);
    name = new TextLayer({
      name: "name",
      parent: this,
      x: avatar.maxX + options.scale * 20,
      y: avatar.y,
      lineHeight: 1.5,
      text: options.name,
      fontSize: 17 * options.scale
    });
    lastMessage = new TextLayer({
      name: "lastMessage",
      parent: this,
      x: name.x,
      y: name.maxY,
      lineHeight: 1.5,
      width: this.width - avatar.width,
      height: 19,
      text: options.lastMessage,
      fontSize: 16 * options.scale
    });
    lastMessage.textOverflow = "elipsis";
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
      });
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
      avatar.setUser(user);
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
