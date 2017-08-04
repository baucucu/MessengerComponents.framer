ios = require 'ios-kit'
ipz = require 'ipz-messenger-kit'

class IpzMessengerHome extends Layer

    constructor:(options={}, user) ->

        options.name ?= "Messenger.Home"
        options.width ?= Screen.width
        options.height ?= Screen.height
        options.backgroundColor ?= Screen.backgroundColor

        super options

        ## HEADER
        avatar = new ipz.IpzAvatar({scale:0.7, superLayer: @, x:Align.left(10)}, user)
        
        searchBox = new ipz.IpzMessengerSearchBox(@)

        # TODO image button class
        compose = new Layer
            superLayer: @
            image: "images/CreateIcon.png"
            x: Align.right(-10)
            width: 26
            height: 26            
        
        activeTab = new ipz.IpzMessengerTab
            label:"Active"
            fontsize:17
            superLayer: @
        groupsTab = new ipz.IpzMessengerTab
            label:"Groups"
            fontsize:17
            superLayer: @
        messagesTab = new ipz.IpzMessengerTab
            label:"Messages"
            fontsize:17
            superLayer: @

        navBar = new ipz.IpzMessengerTabBar
            tabs:[messagesTab, activeTab, groupsTab]
            activeColor:"blue"
            inactiveColor:"grey"
            type:"navBar"
            barTop:40
            viewTop:20
            superLayer: @

        ## END HEADER


        ## NAV VIEWS
        

        activeView = new ios.View
            superLayer: activeTab.view
            y: navBar.maxY - 20
            width: @.width
            height: @.height
            backgroundColor: Screen.backgroundColor
        
        groupsView = new ios.View
            superLayer: groupsTab.view
            y: navBar.maxY - 20
            width: @.width
            height: @.height
            backgroundColor: Screen.backgroundColor

        messagesView = new ScrollComponent
            name:"MessagesScroll"
            superLayer: messagesTab.view
            y: navBar.maxY - 20
            width: @.width
            height: @.height
            scrollHorizontal: false
                
        myDays = new ipz.IpzMyDay({parent: messagesView.content}, user.ActiveFriends)
        lastMessages = new ipz.IpzMessageList({parent: messagesView.content, y: myDays.maxY}, user.Friends[0..20])
        
        ## END NAV VIEWS

module.exports = IpzMessengerHome