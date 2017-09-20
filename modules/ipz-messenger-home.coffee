ios = require 'ios-kit'
ipz = require 'ipz-messenger-kit'


class IpzMessengerHome extends Layer

    constructor:(options={}) ->
        options.name ?= "Messenger.Home"
        options.width ?= options.superLayer.width
        options.height ?= options.superLayer.height
        options.backgroundColor ?= Screen.backgroundColor
        options.navBarLabelsFontSize ?= 14

        super options

        ## HEADER
        searchBox = new ipz.IpzMessengerSearchBox({superLayer: @})
        @avatar = new ipz.IpzAvatar({scale: 0.8, superLayer: @, x: Align.left(10), y: Align.top(3), name: "Avatar"})
        # TODO image button class
        compose = new Layer
            superLayer: @
            name:"compose"
            image: "images/icons/createIcon.png"
            x: Align.right(-14)
            y: Align.top(7)
            width: 24
            height: 24
        
        @activeTab = new ipz.IpzMessengerTab
            label:"Active"
            fontsize:options.navBarLabelsFontSize
            superLayer: @
            lineHeight: 20            
            view: new ios.View
                name:"Active.view"
                superLayer: @
                width: @.width
                height: @.height
                backgroundColor: Screen.backgroundColor

        # groupsTab = new ipz.IpzMessengerTab
        #     label:"Groups"
        #     fontsize:options.navBarLabelsFontSize
        #     superLayer: @
        #     view: new ios.View
        #         name:"Groups.view"
        #         superLayer: @
        #         width: @.width
        #         height: @.height
        #         backgroundColor: Screen.backgroundColor
        
        # callsTab = new ipz.IpzMessengerTab
        #     label:"Calls"
        #     fontsize:options.navBarLabelsFontSize
        #     superLayer: @
        #     view: new ios.View
        #         name:"Calls.view"
        #         superLayer: @
        #         width: @.width
        #         height: @.height
        #         backgroundColor: Screen.backgroundColor

        @messagesTab = new ipz.IpzMessengerTab
            label:"Messages"
            fontsize:options.navBarLabelsFontSize
            superLayer: @
            view: new ScrollComponent
                name:"MessagesScroll"
                superLayer: @
                scrollHorizontal: false
                directionLock: true
                width: @.width
                mouseWheelEnabled: true

        @messagesTab.view.content.backgroundColor = @.backgroundColor

        navBar = new ipz.IpzMessengerTabBar
            superLayer: @
            tabs:[@messagesTab, @activeTab] #, groupsTab, callsTab]
            start:0
            activeColor:"blue"
            inactiveColor:"grey"
            type:"navBar"
            height: 40            
            barTop:searchBox.maxY

        ## END HEADER

    setUser:(user) ->
        @avatar.setUser(user)
        # myDays = new ipz.IpzMyDay({parent: @messagesTab.view.content}, user.MyDays)

        myDay = {firstname: "Add to your day", image_0: "images/icons/AddYourDay.PNG"}
        user.MyDays.splice(0, 0, myDay)

        myDays = new ipz.IpzActiveFriendsScrollList({parent: @messagesTab.view.content, x:Align.left, y:Align.top(20)}, user.MyDays)

        lastMessages = new ipz.IpzMessageList({parent: @messagesTab.view.content, y: myDays.maxY + 10}, user.Friends)
        ios.utils.update(@activeTab.label, [text:"Active (#{user.ActiveCount})"])
        @activeTab.label.x = Align.center(-6)
module.exports = IpzMessengerHome
