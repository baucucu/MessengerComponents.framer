
class RestDbProvider
    url = "https://fbusers-4494.restdb.io/rest"
    apikey = "599d6987bf78f0d50ea2f183"

    getData: (table, query, max, filter, sort, sortDir, callback) ->
        queryString = "#{url}/#{table}?apikey=#{apikey}&max=#{max}&sort=#{sort}&dir=#{sortDir}&filter=#{filter}&idtolink=true&q="+JSON.stringify(query)
        Utils.domLoadData(queryString, callback)

class JsonProvider
    getData: (file, callback) ->
        Utils.domLoadData(file, callback)

class UsersProvider extends JsonProvider
    getUsers: (callback) ->
        users = this.getData("data/users.json", callback)
        return users

    setLoggedInUser:(usersString, carrier) ->
        users = JSON.parse usersString
        myDays = @.getMyDays(users)
        unreadMessageCount = @.getUnreadCount(users)

        loggedInUser = users[0]
        loggedInUser.Carrier = carrier
        loggedInUser.Friends = users[1..20]
        loggedInUser.MyDays = myDays
        loggedInUser.HomeBadge = unreadMessageCount

        return loggedInUser

    getMyDays: (users) ->
        myDays = []
        for user in users
	        if user.myDay == true
		        myDays.push(user)
        return myDays

    getUnreadCount: (users) ->
        result = 0
        for user in users
	        if user.unread is true
		        result++
        return result

exports.UsersProvider = UsersProvider

class FlowProvider extends JsonProvider

    getFlow: (flowName, callback) ->
        flow = this.getData("data/#{flowName}.json", callback)
        return flow

exports.FlowProvider = FlowProvider