ios = require 'ios-kit'
ipz = require 'ipz-messenger-kit'
usersModule = require "ipz-dal-usersDAL"

class IpzMessengerHome
    @header = undefined
    @flow = undefined

    constructor:(parentView, users) ->
        ## HEADER
        @header = new ios.View
            name:"home.Header"
            superLayer: parentView
            width: parentView.width
            height: 64

        navBar = new ipz.IpzMessengerNavBar
            superLayer:@header
            left:"Messages"
            center:"Active"
            right:"Groups"
            blur:false
            
        searchBox = new ipz.IpzMessengerSearchBox(@header)

        compose = new Layer
            image: "images/CreateIcon.png"
            x: Align.right(-10)
            width: 26
            height: 26
            superLayer: @header

        ## END HEADER


        ## NAV VIEWS
        messagesView = new ScrollComponent
            y: parentView.y + @header.height
            width: parentView.width
            height: parentView.height - @header.height
            scrollHorizontal: false

        usersDB = new usersModule
        users = usersDB.getUsers({},20, "", "serialno", -1)
        activeUsers = usersDB.getActiveUsers(users)

        myDays = new ipz.IpzMyDay({parent: messagesView.content}, activeUsers)
        lastMessages = new ipz.IpzMessageList({parent: messagesView.content, y: myDays.maxY}, users[0..2])
        activeFriends = new ipz.IpzActiveFriends({parent: messagesView.content, y: lastMessages.maxY + ipz.style.margin}, activeUsers)
        otherMessages = new ipz.IpzMessageList({parent: messagesView.content, y: activeFriends.maxY + ipz.style.margin}, users[5..20])

        activeView = new ios.View
            x: Screen.width
            y: parentView.y + @header.height
            width: parentView.width
            height: parentView.height - @header.height
            backgroundColor: "orange"
        
        groupsView = new ios.View
            x: Screen.width
            y: parentView.y + @header.height
            width: parentView.width
            height: parentView.height - @header.height
            backgroundColor: "purple"

        ## END NAV VIEWS        
        


        ## EVENTS
        navBar.left.on Events.Tap, (event) ->
            messagesView.x = 0
            activeView.x = Screen.width
            groupsView.x = Screen.width
        navBar.center.on Events.Tap, (event) ->
            messagesView.x = Screen.width
            activeView.x = 0
            groupsView.x = Screen.width
        navBar.right.on Events.Tap, (event) ->
            messagesView.x = Screen.width
            activeView.x = Screen.width
            groupsView.x = 0

        ## END EVENTS

    setAvatar:(user) ->
        avatar = new ipz.IpzAvatar({scale:0.7, superLayer: @header, x:Align.left(10)}, user)

module.exports = IpzMessengerHome