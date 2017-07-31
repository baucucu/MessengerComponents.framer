var CallsDAL, DatabaseDAL, UsersDAL,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

DatabaseDAL = (function() {
  var apikey, data, url;

  function DatabaseDAL() {}

  url = "https://fbusers-4494.restdb.io/rest/";

  apikey = "5956382dafce09e87211e986";

  data = [];

  DatabaseDAL.prototype.getDBData = function(table, query, max, filter, sort, sortDir) {
    var GETdata, users;
    GETdata = ("" + url + table + "?apikey=" + apikey + "&max=" + max + "&sort=" + sort + "&dir={sortDir}&filter=" + filter + "&idtolink=true&q=") + JSON.stringify(query);
    users = JSON.parse(Utils.domLoadDataSync(GETdata));
    return data;
  };

  return DatabaseDAL;

})();

UsersDAL = (function(superClass) {
  extend(UsersDAL, superClass);

  function UsersDAL() {
    return UsersDAL.__super__.constructor.apply(this, arguments);
  }

  UsersDAL.prototype.getUsers = function(query, max, filter, sort, sortDir) {
    var GETdata, apikey, url, users;
    url = "https://fbusers-4494.restdb.io/rest/fbusers";
    apikey = "5956382dafce09e87211e986";
    users = [];
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

})(DatabaseDAL);

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
