ios = require 'ios-kit'
ipz = require 'ipz-messenger-kit'

class IpzMessengerHome

    constructor:(parentView, user) ->
        ## HEADER
        searchBox = new ipz.IpzMessengerSearchBox(parentView)

        # TODO image button class
        compose = new Layer
            superLayer: parentView
            image: "images/CreateIcon.png"
            x: Align.right(-10)
            width: 26
            height: 26            

        avatar = new ipz.IpzAvatar({scale:0.7, superLayer: parentView, x:Align.left(10)}, user)

        messagesTab = new ipz.IpzMessengerTab
            label:"Messages"
            fontsize:17
            superLayer: parentView
        activeTab = new ipz.IpzMessengerTab
            label:"Active"
            fontsize:17
            superLayer: parentView
        groupsTab = new ipz.IpzMessengerTab
            label:"Groups"
            fontsize:17
            superLayer: parentView

        tabBar = new ipz.IpzMessengerTabBar
            tabs:[messagesTab, activeTab, groupsTab]
            activeColor:"blue"
            inactiveColor:"grey"
            start:0
            type:"navBar"
            barTop:60
            viewBottom:52
            # TODO fix this
            # superLayer: parentView

        ## END HEADER


        ## NAV VIEWS
        messagesView = new ScrollComponent
            name:"MessagesScroll"
            superLayer: messagesTab.view
            y: tabBar.maxY - 20
            width: parentView.width
            height: parentView.height - 70
            scrollHorizontal: false
                
        myDays = new ipz.IpzMyDay({parent: messagesView.content}, user.ActiveFriends)
        lastMessages = new ipz.IpzMessageList({parent: messagesView.content, y: myDays.maxY}, user.Friends[0..20])

        activeView = new ios.View
            superLayer: activeTab.view
            y: tabBar.maxY - 20
            width: parentView.width
            height: parentView.height - 70
            backgroundColor: "orange"
        
        groupsView = new ios.View
            superLayer: groupsTab.view
            y: tabBar.maxY - 20
            width: parentView.width
            height: parentView.height - 70
            backgroundColor: "purple"

        ## END NAV VIEWS

module.exports = IpzMessengerHome