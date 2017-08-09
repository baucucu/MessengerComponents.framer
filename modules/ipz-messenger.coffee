ios = require "ios-kit"
ipz = require "ipz-messenger-kit"

class IpzMessenger extends Layer

    constructor:(options = {}, user) ->
        options.name ?= "Messenger.Main"
        options.width ?= Screen.width
        options.height ?= Screen.height
        options.backgroundColor ?= Screen.backgroundColor

        super options

        homeTab = new ipz.IpzMessengerTab
            superLayer: @
            label:"Home"
            activeIcon:"images/HomeIconActive.png"
            
        callsTab = new ipz.IpzMessengerTab
            superLayer: @
            label:"Calls"
            activeIcon:"images/CallsIconActive.png"
            
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
            
        gamesTab = new ipz.IpzMessengerTab
            superLayer: @
            label:"Games"
            activeIcon:"images/GamesIconActive.png"
            
        tabBar = new ipz.IpzMessengerTabBar
            superLayer: @
            tabs:[homeTab, callsTab, cameraTab, peopleTab, gamesTab]
            start:0
            activeColor:"blue"
            inactiveColor:"grey"            
            viewTop:options.y

        #  TODO set based on data from DB
        tabBar.setBadgeValue(0, 5)
        tabBar.setBadgeValue(1, 2)

        homeView = new ipz.IpzMessengerHome({superLayer: homeTab.view}, user)   #, height: Screen.height-130

        callsView = new ios.View
            name:"calls"
            superLayer: callsTab.view
            backgroundColor: "red"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:0

        camView = new ios.View
            superLayer: cameraTab.view
            backgroundColor: "black"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:0

        peopleView = new ios.View
            superLayer: peopleTab.view
            backgroundColor: "orange"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:0

        gamesView = new ios.View
            superLayer: gamesTab.view
            backgroundColor: "green"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:0

module.exports = IpzMessenger
