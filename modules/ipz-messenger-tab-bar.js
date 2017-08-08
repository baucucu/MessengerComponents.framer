var ios, utils;

ios = require('ios-kit');

utils = require('ipz-utils');

exports.defaults = {
  tab: {
    label: "label",
    fontsize: 10,
    iconsize: 25,
    activeIcon: void 0,
    inactiveIcon: void 0,
    active: void 0,
    inactive: void 0,
    type: "tab",
    superLayer: void 0,
    badgeSize: 16,
    badgeColor: "#FF3B30",
    badgeTextStyle: {
      fontSize: "12px",
      lineHeight: "36px",
      color: "#fff",
      textAlign: "center",
      fontFamily: "Helvetica Neue', sans-serif"
    }
  },
  bar: {
    tabs: [],
    start: 0,
    type: "tabBar",
    barTop: 0,
    backgroundColor: "white",
    activeColor: "blue",
    inactiveColor: "gray",
    blur: true,
    viewTop: 0,
    viewBottom: 52,
    superLayer: void 0
  }
};

exports.defaults.tab.props = Object.keys(exports.defaults.tab);

exports.defaults.bar.props = Object.keys(exports.defaults.bar);

exports.tab = function(array) {
  var setup, specs, tab;
  setup = ios.utils.setupComponent(array, exports.defaults.tab);
  specs = {
    width: 75
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 55;
  }
  tab = new ios.View({
    superLayer: setup.superLayer,
    backgroundColor: "transparent",
    name: setup.label,
    constraints: {
      width: specs.width,
      height: 52
    }
  });
  tab.view = new ios.View({
    superLayer: setup.superLayer,
    name: setup.label + ".view",
    backgroundColor: "transparent",
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: setup.viewBottom
    }
  });
  tab.active = new ios.View({
    name: ".active",
    backgroundColor: "transparent",
    constraints: {
      top: 0,
      bottom: Screen.height,
      leading: 0,
      trailing: 0
    },
    superLayer: tab
  });
  tab.active.icon = new ios.View({
    name: ".active.icon",
    constraints: {
      width: setup.iconsize,
      height: setup.iconsize,
      align: "horizontal",
      top: 7
    },
    backgroundColor: "transparent",
    superLayer: tab.active
  });
  if (setup.active === void 0) {
    if (setup.activeIcon !== void 0) {
      tab.active.icon.image = setup.activeIcon;
      tab.active.icon.width = setup.iconsize;
      tab.active.icon.height = setup.iconsize;
    }
  } else {
    setup.active.superLayer = tab.active.icon;
    setup.active.props = {
      width: tab.active.icon.width,
      height: tab.active.icon.height
    };
  }
  tab.inactive = new ios.View({
    backgroundColor: "transparent",
    name: ".inactive",
    constraints: {
      top: 0,
      bottom: Screen.height,
      leading: 0,
      trailing: 0
    },
    superLayer: tab
  });
  tab.inactive.icon = new ios.View({
    constraints: {
      width: setup.iconsize,
      height: setup.iconsize,
      align: "horizontal",
      top: 7
    },
    backgroundColor: "transparent",
    name: ".inactive.icon",
    superLayer: tab.inactive
  });
  tab.label = new ios.Text({
    text: setup.label,
    superLayer: tab,
    color: "#929292",
    fontSize: setup.fontsize,
    name: ".label",
    textTransform: "capitalize"
  });
  tab.label.constraints = {
    horizontalCenter: tab.active
  };
  if (setup.inactive === void 0) {
    if (setup.inactiveIcon !== void 0) {
      tab.inactive.icon.image = setup.inactiveIcon;
      tab.inactive.icon.width = setup.iconsize;
      tab.inactive.icon.height = setup.iconsize;
    }
  } else {
    setup.inactive.superLayer = tab.inactive.icon;
    setup.inactive.props = {
      width: tab.inactive.icon.width,
      height: tab.inactive.icon.height
    };
  }
  if (setup.activeIcon !== void 0) {
    tab.badgeLayer = new Layer({
      name: setup.label + ".badge",
      width: setup.badgeSize,
      height: setup.badgeSize,
      x: 0,
      y: 6,
      borderRadius: 18,
      superLayer: tab,
      backgroundColor: setup.badgeColor
    });
    tab.badgeLayer.style = setup.badgeTextStyle;
    tab.badgeLayer.centerX(16);
    tab.badgeLayer.visible = false;
  }
  return tab;
};

exports.bar = function(array) {
  var bar, dummyTab, dummyTab2, i, index, len, ref, setActive, setup, specs, tab;
  setup = ios.utils.setupComponent(array, exports.defaults.bar);
  if (setup.tabs.length === 0) {
    dummyTab = new exports.tab;
    dummyTab2 = new exports.tab;
    setup.tabs.push(dummyTab);
    setup.tabs.push(dummyTab2);
  }
  specs = {
    width: Screen.width / setup.tabs.length
  };
  bar = new ios.View({
    superLayer: setup.superLayer,
    backgroundColor: "transparent",
    name: "tabBar",
    constraints: {
      leading: 0,
      trailing: 0
    }
  });
  bar.bg = new ios.View({
    superLayer: bar,
    name: ".bg",
    constraints: {
      leading: 0,
      trailing: 0
    }
  });
  bar.divider = new ios.View({
    backgroundColor: "#B2B2B2",
    name: ".divider",
    superLayer: bar,
    constraints: {
      leading: 0,
      trailing: 0,
      height: .5
    }
  });
  bar.box = new ios.View({
    superLayer: bar,
    backgroundColor: "transparent",
    name: ".box",
    constraints: {
      width: Screen.width
    }
  });
  if (setup.type === "navBar") {
    bar.constraints.top = setup.barTop;
    bar.constraints.height = 22;
    bar.bg.constraints.top = 0;
    bar.bg.constraints.height = 22;
    bar.box.constraints.height = 22;
    bar.divider.y = 22;
  } else {
    bar.constraints.bottom = 0;
    bar.constraints.height = 52;
    bar.bg.constraints.bottom = 0;
    bar.bg.constraints.height = 52;
    bar.box.constraints.height = 52;
    bar.divider.top = 70;
  }
  setActive = function(tabIndex) {
    var i, index, len, ref, results, tab;
    ref = setup.tabs;
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      tab = ref[index];
      if (index === tabIndex) {
        tab.label.color = ios.utils.color(setup.activeColor);
        tab.active.visible = true;
        tab.inactive.visible = false;
        results.push(utils.setVisible(tab.view, true));
      } else {
        tab.label.color = ios.utils.color(setup.inactiveColor);
        tab.active.visible = false;
        tab.inactive.visible = true;
        results.push(utils.setVisible(tab.view, false));
      }
    }
    return results;
  };
  bar.setBadgeValue = (function(_this) {
    return function(tabIndex, value) {
      var i, index, len, ref, results, tab;
      ref = setup.tabs;
      results = [];
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        tab = ref[index];
        if (index === tabIndex) {
          if (value) {
            tab.badgeLayer.html = value;
            results.push(tab.badgeLayer.visible = true);
          } else {
            results.push(tab.badgeLayer.visible = false);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
  })(this);
  ref = setup.tabs;
  for (index = i = 0, len = ref.length; i < len; index = ++i) {
    tab = ref[index];
    bar.box.addSubLayer(tab);
    tab.label.color = ios.utils.color(setup.inactiveColor);
    bar.bg.backgroundColor = setup.backgroundColor;
    if (setup.blur) {
      bar.bg.backgroundColor = "rgba(255,255,255, .9)";
      ios.utils.bgBlur(bar.bg);
    }
    tab.view.constraints.top = setup.viewTop;
    tab.view.constraints.bottom = setup.viewBottom;
    if (setup.type === "navBar") {
      specs.width = bar.width / setup.tabs.length;
      tab.constraints.width = specs.width;
      tab.constraints.height = 22;
    } else {
      tab.label.constraints.top = setup.viewBottom - 10;
    }
    if (index === 0) {
      tab.constraints.leading = 0;
    } else {
      tab.constraints.leading = setup.tabs[index - 1];
    }
    ios.layout.set(tab);
    tab.on(Events.TouchStart, function() {
      var tabIndex;
      tabIndex = this.x / ios.utils.px(specs.width);
      return setActive(tabIndex);
    });
  }
  bar.box.constraints = {
    align: "horizontal"
  };
  ios.layout.set(bar.box);
  setActive(setup.start);
  bar.tabs = setup.tabs;
  return bar;
};
