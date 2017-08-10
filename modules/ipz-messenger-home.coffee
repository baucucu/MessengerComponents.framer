ios = require 'ios-kit'
ipz = require 'ipz-messenger-kit'

class IpzMessengerHome extends Layer

    constructor:(options={}, user) ->

        options.name ?= "Messenger.Home"
        options.width ?= Screen.width
        options.height ?= options.superLayer.height
        options.backgroundColor ?= Screen.backgroundColor
        options.navBarLabelsFontSize ?= 17

        super options

        ## HEADER

        searchBox = new ipz.IpzMessengerSearchBox({superLayer: @})
        
        avatar = new ipz.IpzAvatar({scale:0.7, superLayer: @, x:Align.left(10), y:Align.top(-3), name:"Avatar"}, user)
        
        # TODO image button class
        compose = new Layer
            superLayer: @
            name:"compose"
            image: "images/CreateIcon.png"
            x: Align.right(-10)
            width: 24
            height: 24            
                
        activeTab = new ipz.IpzMessengerTab
            label:"Active"
            fontsize:options.navBarLabelsFontSize
            superLayer: @
        groupsTab = new ipz.IpzMessengerTab
            label:"Groups"
            fontsize:options.navBarLabelsFontSize
            superLayer: @
        messagesTab = new ipz.IpzMessengerTab
            label:"Messages"
            fontsize:options.navBarLabelsFontSize
            superLayer: @

        navBar = new ipz.IpzMessengerTabBar
            superLayer: @
            tabs:[messagesTab, activeTab, groupsTab]
            activeColor:"blue"
            inactiveColor:"grey"
            type:"navBar"
            height: 22
            barTop:searchBox.maxY + 5

        ## END HEADER


        ## NAV VIEWS
        activeView = new ios.View
            superLayer: activeTab.view
            width: @.width
            height: @.height
            backgroundColor: Screen.backgroundColor
        
        groupsView = new ios.View
            superLayer: groupsTab.view
            width: @.width
            height: @.height
            backgroundColor: Screen.backgroundColor      

        messagesView = new ScrollComponent
            name:"MessagesScroll"
            superLayer: messagesTab.view
            width: @.width
            height: messagesTab.view.height
            scrollHorizontal: false
            directionLock: true
                
        myDays = new ipz.IpzMyDay({parent: messagesView.content}, user.ActiveFriends)
        lastMessages = new ipz.IpzMessageList({parent: messagesView.content, y: myDays.maxY}, user.Friends[0..20])
        
        ## END NAV VIEWS

module.exports = IpzMessengerHome