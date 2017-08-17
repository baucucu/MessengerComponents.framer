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
                constraints:
                    leading:0
                    trailing:0
                    top:0
                    bottom:0
            
        cameraTab = new ipz.IpzMessengerTab
            superLayer: @
            label:""
            activeIcon:"images/CameraIconActive.png"
            iconsize:45            
            alwaysActive:true
            canHaveBadge:false

        peopleTab = new ipz.IpzMessengerTab
            superLayer: @
            label:"People"
            activeIcon:"images/PeopleIconActive.png"
            view:new ios.View
                name:"People.view"
                superLayer: @
                backgroundColor: "orange"
                constraints:
                    leading:0
                    trailing:0
                    top:0
                    bottom:0
            
        gamesTab = new ipz.IpzMessengerTab
            superLayer: @
            label:"Games"
            activeIcon:"images/GamesIconActive.png"
            view:new ios.View
                name:"Games.view"
                superLayer: @
                backgroundColor: "green"
                constraints:
                    leading:0
                    trailing:0
                    top:0
                    bottom:0
            
        @tabBar = new ipz.IpzMessengerTabBar
            superLayer: @
            tabs:[@homeTab, callsTab, cameraTab, peopleTab, gamesTab]
            start:0
            activeColor:"blue"
            inactiveColor:"grey"            
            viewTop:options.y

        camView = new ios.View
            name:"Camera.view"
            superLayer: cameraTab.view
            backgroundColor: "black"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:0                

    setUser:(user) ->
        @homeTab.view.setUser(user)

        @tabBar.setBadgeValue(0, user.HomeBadge)
        @tabBar.setBadgeValue(1, user.CallsBadge)
        @tabBar.setBadgeValue(3, user.PeopleBadge)
        @tabBar.setBadgeValue(4, user.GamesBadge)

module.exports = IpzMessenger
