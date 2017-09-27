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
        @avatar = new ipz.IpzAvatar({scale: 0.73, superLayer: @, x: Align.left(9), y: Align.top(3), name: "Avatar"})
        # TODO image button class
        compose = new Layer
            superLayer: @
            name:"compose"
            image: "images/icons/createIcon.png"
            x: Align.right(-14)
            y: Align.top(5)
            width: 24
            height: 24
        
        @activeTab = new ipz.IpzMessengerTab
            label:"Active"
            fontsize:options.navBarLabelsFontSize
            superLayer: @                    
            view: new ios.View
                name:"Active.view"
                superLayer: @
                width: @.width
                height: @.height
                backgroundColor: Screen.backgroundColor

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
                height: @.height
                mouseWheelEnabled: true

        @messagesTab.view.content.backgroundColor = @.backgroundColor
        

        navBar = new ipz.IpzMessengerTabBar
            superLayer: @
            tabs:[@messagesTab, @activeTab] #, groupsTab, callsTab]
            start:0
            activeColor:"blue"
            inactiveColor:"grey"
            type:"navBar"
            height: 37            
            barTop:searchBox.maxY

        ## END HEADER

    setUser:(user) ->
        @avatar.setUser(user)

        myDay = {firstname: "Add to your day", image_0: "images/icons/AddYourDay.PNG"}
        user.MyDays.splice(0, 0, myDay)       

        myDays = new ipz.IpzActiveFriendsScrollList({parent: @messagesTab.view.content, x:Align.left, y:Align.top(10)}, user.MyDays)

        lastMessages = new ipz.IpzMessageList({parent: @messagesTab.view.content, y: myDays.maxY + 10}, user.Friends)
        ios.utils.update(@activeTab.label, [text:"Active (#{user.ActiveCount})"])

module.exports = IpzMessengerHome
