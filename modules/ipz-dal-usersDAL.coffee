class UsersDAL
    url = "https://fbusers-4494.restdb.io/rest/fbusers"
    apikey = "5956382dafce09e87211e986"

    users = []

    getUsers: (query, max, filter, sort, sortDir) ->
        GETdata = "#{url}?apikey=#{apikey}&max=#{max}&sort=#{sort}&dir={sortDir}&filter=#{filter}&idtolink=true&q="+JSON.stringify(query)
        # load data from db
        users = JSON.parse Utils.domLoadDataSync GETdata
        return users

    getActiveUsers: (users) ->
        activeUsers = []
        for user in users
	        if user.status is "active"
		        activeUsers.push(user)
        return activeUsers

    getBirthdayUsers: (users) ->
        birthdayUsers = []
        for user in users
	        if user.birthday == true
		        birthdayUsers.push(user)
        return birthdayUsers

    getFavoriteUsers: (users) ->
        favoriteUsers = []
        for user in users
	        if user.favorite == true
		        favoriteUsers.push(user)
        return favoriteUsers

    getMyDays: (users) ->
        myDays = []
        for user in users
	        if user.myDay == true
		        myDays.push(user)
        return myDays

    module.exports = UsersDAL

class CallsDAL
    url = "https://fbusers-4494.restdb.io/rest/calls"
    apikey = "8be0d27776dab9483acffbe9715ee02512be3"

    calls = []

    getCalls: (query, max, filter, sort, sortDir) ->
        GETdata = "#{url}?apikey=#{apikey}&max=#{max}&sort=#{sort}&dir={sortDir}&filter=#{filter}&idtolink=true&q="+JSON.stringify(query)
        # load data from db
        users = JSON.parse Utils.domLoadDataSync GETdata
        return calls

    module.exports CallsDAL
