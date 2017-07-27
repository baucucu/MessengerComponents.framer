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
