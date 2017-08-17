ios = require 'ios-kit'
ipz = require 'ipz-messenger-kit'

class IpzMessengerHome extends Layer

    @avatar = undefined
    @messagesTab = undefined

    constructor:(options={}) ->
        options.name ?= "Messenger.Home"
        options.width ?= options.superLayer.width
        options.height ?= options.superLayer.height
        options.backgroundColor ?= Screen.backgroundColor
        options.navBarLabelsFontSize ?= 17

        super options

        ## HEADER

        searchBox = new ipz.IpzMessengerSearchBox({superLayer: @})
        
        @avatar = new ipz.IpzAvatar({scale:0.7, superLayer: @, x:Align.left(10), y:Align.top(-3), name:"Avatar"})
                
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
            view: new ios.View
                name:"Active.view"
                superLayer: @
                width: @.width
                height: @.height
                backgroundColor: Screen.backgroundColor

        groupsTab = new ipz.IpzMessengerTab
            label:"Groups"
            fontsize:options.navBarLabelsFontSize
            superLayer: @
            view: new ios.View
                name:"Groups.view"
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

        @messagesTab.view.content.backgroundColor = @.backgroundColor

        navBar = new ipz.IpzMessengerTabBar
            superLayer: @
            tabs:[@messagesTab, activeTab, groupsTab]
            activeColor:"blue"
            inactiveColor:"grey"
            type:"navBar"
            height: 22
            barTop:searchBox.maxY + 5

        ## END HEADER

    setUser:(user) ->
        @avatar.setUser(user)   
        myDays = new ipz.IpzMyDay({parent: @messagesTab.view.content}, user.MyDays)
        lastMessages = new ipz.IpzMessageList({parent: @messagesTab.view.content, y: myDays.maxY}, user.Friends)

module.exports = IpzMessengerHome