ios = require "ios-kit"
ipz = require "ipz-messenger-kit"

class IpzMessenger extends Layer

    @homeTab = undefined
    @tabBar = undefined

    constructor:(options = {}) ->
        options.name ?= "Messenger.Main"
        options.width ?= Screen.width
        options.height ?= Screen.height
        options.backgroundColor ?= Screen.backgroundColor

        super options

        @homeTab = new ipz.IpzMessengerTab
            superLayer: @
            label:"Home"
            activeIcon:"images/HomeIconActive.png"
            view: new ipz.IpzMessengerHome({superLayer: @})
            
        callsTab = new ipz.IpzMessengerTab
            superLayer: @
            label:"Calls"
            activeIcon:"images/CallsIconActive.png"
            view: new ios.View
                name:"Calls.view"
                superLayer: @
                backgroundColor: "red"
            
        cameraTab = new ipz.IpzMessengerTab
            superLayer: @
            label:""
            activeIcon:"images/CameraIconActive.png"
            iconsize:45            
            alwaysActive:true
            canHaveBadge:false
            view: new ios.View
                name:"Camera.view"
                superLayer: @
                backgroundColor: "black"

        peopleTab = new ipz.IpzMessengerTab
            superLayer: @
            label:"People"
            activeIcon:"images/PeopleIconActive.png"
            view:new ios.View
                name:"People.view"
                superLayer: @
                backgroundColor: "orange"
            
        gamesTab = new ipz.IpzMessengerTab
            superLayer: @
            label:"Games"
            activeIcon:"images/GamesIconActive.png"
            view:new ios.View
                name:"Games.view"
                superLayer: @
                backgroundColor: "green"
            
        @tabBar = new ipz.IpzMessengerTabBar
            superLayer: @
            tabs:[@homeTab, callsTab, cameraTab, peopleTab, gamesTab]
            start:0
            activeColor:"blue"
            inactiveColor:"grey"            
            viewTop:options.y               

    setUser:(user) ->
        @homeTab.view.setUser(user)

        @tabBar.setBadgeValue(0, user.HomeBadge)
        @tabBar.setBadgeValue(1, user.CallsBadge)
        @tabBar.setBadgeValue(3, user.PeopleBadge)
        @tabBar.setBadgeValue(4, user.GamesBadge)

module.exports = IpzMessenger
