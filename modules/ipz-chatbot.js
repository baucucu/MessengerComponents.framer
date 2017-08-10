var IpzChatBot, IpzMessenger, ios,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ios = require("ios-kit");

IpzMessenger = require("ipz-messenger");

IpzChatBot = (function(superClass) {
  extend(IpzChatBot, superClass);

  IpzChatBot.flow = void 0;

  IpzChatBot.user = void 0;

  IpzChatBot.statusBar = void 0;

  function IpzChatBot(options, user) {
    if (options == null) {
      options = {};
    }
    if (options.name == null) {
      options.name = "ChatBot";
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
    IpzChatBot.__super__.constructor.call(this, options);
    this.user = user;
    this.statusBar = new ios.StatusBar({
      carrier: user.Carrier
    });
    this.flow = new FlowComponent({
      superLayer: this
    });
    this.flow.header = this.statusBar;
  }

  IpzChatBot.prototype.showNext = function(viewName) {
    var view;
    view = (function() {
      switch (viewName) {
        case "Main":
          return new IpzMessenger({
            name: "main",
            y: this.statusBar.maxY
          }, this.user);
      }
    }).call(this);
    return this.flow.showNext(view);
  };

  return IpzChatBot;

})(Layer);

module.exports = IpzChatBot;
