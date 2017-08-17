class BaseDAL
    url = "https://fbusers-4494.restdb.io/rest"
    apikey = "5956382dafce09e87211e986"

    getDbData: (table, query, max, filter, sort, sortDir, callback) ->
        queryString = "#{url}/#{table}?apikey=#{apikey}&max=#{max}&sort=#{sort}&dir=#{sortDir}&filter=#{filter}&idtolink=true&q="+JSON.stringify(query)
        # load data from db
        # dbData = JSON.parse Utils.domLoadDataSync queryString
        # return dbData
        Utils.domLoadData(queryString, callback)

class UsersDAL extends BaseDAL
    users = []

    getUsers: (query, max, filter, sort, sortDir, callback) ->
        users = this.getDbData("fbusers", query, max, filter, sort, sortDir, callback)
        # users = JSON.parse '[{"_id":"59563b726f471d080000143e","firstname":"Helen","lastname":"Yundt","image":["0000000000000000000000000_30-30-people-8"],"messageText":"Veniam corrupti quas.","messageTime":"4:45 AM","favorite":true,"birthday":false,"wish":"In nemo molestiae autem aut.","_mock":true,"myDay":false,"myDayTime":0,"status":"inactive","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-8"},{"_id":"59563b726f471d0800001447","firstname":"Pamela","lastname":"Gibson","image":["0000000000000000000000000_30-30-people-1"],"messageText":"Corrupti rerum ut aut quia.","messageTime":"2:43 AM","favorite":false,"birthday":true,"wish":"Molestias vitae iusto voluptatem sint.","_mock":true,"myDay":true,"myDayTime":7,"status":"messenger","unread":true,"image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-1"},{"_id":"59563b726f471d080000144b","firstname":"Orpha","lastname":"Windler","image":["0000000000000000000000000_30-30-people-8"],"messageText":"Exercitationem autem labore.","messageTime":"2:47 AM","favorite":true,"birthday":false,"wish":"Eius modi facilis perferendis ut aut blanditiis voluptas.","_mock":true,"myDay":true,"myDayTime":50,"status":"inactive","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-8"},{"_id":"59563b726f471d0800001445","firstname":"Kristina","lastname":"Johnston","image":["0000000000000000000000000_30-30-people-9"],"messageText":"Laboriosam odio ut aut et.","messageTime":"3:56 AM","favorite":true,"birthday":false,"wish":"Et ratione est omnis qui sit.","_mock":true,"myDay":false,"myDayTime":0,"status":"messenger","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-9"},{"_id":"59563b726f471d0800001450","firstname":"Ashtyn","lastname":"Tromp","image":["0000000000000000000000000_30-30-people-4"],"messageText":"Voluptas minus qui sed quasi.","messageTime":"7:30 PM","favorite":true,"birthday":false,"wish":"Qui recusandae odit optio nemo.","_mock":true,"myDay":false,"myDayTime":0,"unread":true,"status":"active","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-4"},{"_id":"59563b726f471d0800001443","firstname":"Caleb","lastname":"Purdy","image":["0000000000000000000000000_30-30-people-1"],"messageText":"Animi minima repellendus aut.","messageTime":"3:33 AM","favorite":false,"birthday":false,"wish":"Sequi debitis non.","_mock":true,"myDay":true,"myDayTime":24,"status":"messenger","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-1"},{"_id":"59563b726f471d0800001449","firstname":"Esther","lastname":"Bauch","image":["0000000000000000000000000_30-30-people-6"],"messageText":"Repellat veniam aut laborum.","messageTime":"12:33 AM","favorite":false,"birthday":false,"wish":"Magni iste voluptate beatae veritatis voluptatem.","_mock":true,"myDay":true,"myDayTime":32,"status":"messenger","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-6"},{"_id":"59563b726f471d0800001451","firstname":"Paige","lastname":"Torphy","image":["0000000000000000000000000_30-30-people-9"],"messageText":"Vitae consequatur iste quos.","messageTime":"1:11 AM","favorite":false,"birthday":false,"wish":"Accusantium sed libero qui nesciunt.","_mock":true,"myDay":false,"myDayTime":0,"status":"inactive","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-9"},{"_id":"59563b726f471d080000144d","firstname":"Reginald","lastname":"Wintheiser","image":["0000000000000000000000000_30-30-people-1"],"messageText":"Aliquam ut quisquam amet.","messageTime":"8:14 AM","favorite":true,"birthday":true,"wish":"Minus nesciunt aut eum quasi voluptas.","_mock":true,"myDay":false,"myDayTime":0,"status":"messenger","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-1"},{"_id":"59563b726f471d080000144f","firstname":"Barrett","lastname":"Crist","image":["0000000000000000000000000_30-30-people-8"],"messageText":"Blanditiis iure eligendi veritatis.","messageTime":"3:23 PM","favorite":false,"birthday":false,"wish":"Alias et quam alias cupiditate harum expedita dolores nostrum.","_mock":true,"myDay":true,"myDayTime":29,"unread":true,"status":"active","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-8"},{"_id":"59563b726f471d080000144c","firstname":"Juana","lastname":"Doyle","image":["0000000000000000000000000_30-30-people-5"],"messageText":"Expedita molestias.","messageTime":"2:41 AM","favorite":true,"birthday":false,"wish":"Inventore tempore consectetur aut.","_mock":true,"myDay":true,"myDayTime":14,"status":"messenger","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-5"},{"_id":"59563b726f471d0800001441","firstname":"Bradly","lastname":"Oberbrunner","image":["0000000000000000000000000_30-30-people-1"],"messageText":"Eos libero consequuntur.","messageTime":"4:43 PM","favorite":false,"birthday":false,"wish":"Sit consectetur perferendis numquam consequatur alias et tenetur.","_mock":true,"myDay":false,"myDayTime":0,"status":"active","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-1"},{"_id":"59563b726f471d0800001444","firstname":"Zena","lastname":"Hessel","image":["0000000000000000000000000_30-30-people-5"],"messageText":"Unde cumque in nobis hic vel.","messageTime":"1:23 PM","favorite":false,"birthday":false,"wish":"Omnis dolorem dicta.","_mock":true,"myDay":false,"myDayTime":0,"status":"active","unread":true,"image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-5"},{"_id":"59563b726f471d0800001446","firstname":"Laverne","lastname":"Carroll","image":["0000000000000000000000000_30-30-people-7"],"messageText":"Numquam doloribus ab corporis.","messageTime":"11:14 PM","favorite":false,"birthday":false,"wish":"Quas sed consectetur culpa voluptas expedita voluptas enim.","_mock":true,"myDay":false,"myDayTime":0,"status":"active","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-7"},{"_id":"59563b726f471d0800001448","firstname":"Cornelius","lastname":"Collins","image":["0000000000000000000000000_30-30-people-1"],"messageText":"Quo fugit deleniti id veritatis et.","messageTime":"10:44 PM","favorite":true,"birthday":false,"wish":"Corrupti totam dolore ratione maiores iure cupiditate ea incidunt.","_mock":true,"myDay":false,"myDayTime":0,"status":"active","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-1"},{"_id":"59563b726f471d080000144a","firstname":"Nathanael","lastname":"Jast","image":["0000000000000000000000000_30-30-people-4"],"messageText":"Qui cumque est.","messageTime":"6:11 AM","favorite":false,"birthday":false,"wish":"Eius et velit repellendus sit id voluptatem.","_mock":true,"myDay":true,"myDayTime":5,"status":"messenger","unread":true,"image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-4"},{"_id":"59563b726f471d080000144e","firstname":"Jermaine","lastname":"Ullrich","image":["0000000000000000000000000_30-30-people-8"],"messageText":"Laudantium repudiandae est quam.","messageTime":"6:14 PM","favorite":false,"birthday":false,"wish":"Sit qui culpa dolores optio aut cumque ut nemo.","_mock":true,"myDay":false,"myDayTime":0,"status":"inactive","unread":true,"image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-8"},{"_id":"59563b726f471d080000143f","firstname":"Sylvan","lastname":"Skiles","image":["0000000000000000000000000_30-30-people-5"],"messageText":"Id vitae repellendus.","messageTime":"9:12 AM","favorite":false,"birthday":false,"wish":"Nobis officiis atque distinctio laborum qui aliquam ea.","_mock":true,"myDay":true,"myDayTime":47,"status":"active","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-5"},{"_id":"59563b726f471d0800001442","firstname":"Bernadine","lastname":"Vandervort","image":["0000000000000000000000000_30-30-people-9"],"messageText":"Nam saepe quod totam.","messageTime":"1:53 AM","favorite":true,"birthday":false,"wish":"Ex nostrum et earum omnis inventore qui sed illum repellat.","_mock":true,"myDay":true,"myDayTime":10,"unread":true,"status":"active","image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-9"},{"_id":"59563b726f471d0800001440","firstname":"Kaley","lastname":"Barton","image":["0000000000000000000000000_30-30-people-1"],"messageText":"Sed recusandae et.","messageTime":"1:14 AM","favorite":false,"birthday":false,"wish":"Est amet unde dolores qui sapiente qui et nobis.","_mock":true,"myDay":false,"myDayTime":0,"status":"active","unread":true,"image_0":"https://fbusers-4494.restdb.io/media/0000000000000000000000000_30-30-people-1"}]'
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
