ios = require 'ios-kit'
utils = require 'ipz-utils'

exports.defaults = {
	tab: {
		superLayer:undefined
		view:undefined
		label: "label"
		fontsize: 10
		activeIcon:undefined	# TODO rename as icon
		iconsize: 25
		padding: 5		
		alwaysActive:false
		canHaveBadge:true
		badgeSize: 12
		badgeColor: "#FF3B30"
		badgeTextStyle : {
			fontSize: 10
			color: "#fff"
			textAlign: "center"
		}
	}
	bar: {		
		superLayer:undefined
		type:"tabBar"
		tabs: []
		start:0
		barTop:0
		height:52
		backgroundColor:"rgba(250,248,251,0.8)"
		blur:false
		activeColor:"blue"
		inactiveColor:"gray"
		viewTop:0			
	}
}

exports.defaults.tab.props = Object.keys(exports.defaults.tab)
exports.defaults.bar.props = Object.keys(exports.defaults.bar)

exports.tab = (array) ->
	setup = ios.utils.setupComponent(array, exports.defaults.tab)

	tab = new ios.View
		superLayer:setup.superLayer
		backgroundColor:"rgba(250,248,251,0.8)"
		name:setup.label

	if (setup.view != undefined)
		tab.view = setup.view
		tab.view.constraints =
			leading:0
			trailing:0
			# bottom:0
	else
		tab.view = new ios.View
			superLayer:setup.superLayer
			name:setup.label + ".view"
			backgroundColor:"transparent"
			constraints:
				leading:0
				trailing:0
				top:0
				bottom:0

	# Create Container
	tab.container = new ios.View
		name: setup.label + ".container"
		superLayer:tab
		backgroundColor:"transparent"
		constraints:
			top:setup.padding
			bottom:setup.padding
			leading:setup.padding
			trailing:setup.padding	

	if setup.activeIcon != undefined
		tab.icon = new ios.View
			name: setup.label + ".icon"
			superLayer:tab.container
			backgroundColor:"transparent"
			constraints:
				width:setup.iconsize
				height:setup.iconsize
				align:"horizontal"
		
		tab.imageLayer = new ios.View
			name: setup.label + ".image"
			superLayer:tab.icon
			image: setup.activeIcon
			backgroundColor:"transparent"
			constraints:
				width:setup.iconsize
				height:setup.iconsize

		if (setup.canHaveBadge)
			tab.badge = new TextLayer
				name:setup.label + ".badge"
				superLayer: tab.icon
				x:Align.right(7)
				y:Align.top
				width: setup.badgeSize
				height: setup.badgeSize
				borderRadius: 18
				backgroundColor: setup.badgeColor				
				fontSize: setup.badgeTextStyle.fontSize
				color: setup.badgeTextStyle.color
				textAlign: setup.badgeTextStyle.textAlign	
			tab.badge.visible = false
						
	if (setup.label != "")	
		tab.label = new ios.Text
			name: setup.label + ".label"
			superLayer:tab.container
			text:setup.label
			color:"#929292"			
			fontSize:setup.fontsize
			constraints:
				align:"horizontal"
				bottom:0		

		if setup.activeIcon != undefined
			tab.label.constraints.bottom = -10

	tab.setActive = (value) ->
		if (value == true)
			tab.label.color = ios.utils.color("blue")			
			if (tab.imageLayer != undefined)
				tab.imageLayer.saturate = 100
				tab.imageLayer.brightness = 100
				
		else
			if (!setup.alwaysActive)
				tab.label.color = ios.utils.color("grey")				
				if (tab.imageLayer != undefined)
					tab.imageLayer.saturate = 0
					tab.imageLayer.brightness = 180

		utils.setVisible(tab.view, value)

	return tab

exports.bar = (array) ->
	setup = ios.utils.setupComponent(array, exports.defaults.bar)

	# If no tabs, make dummy tabs
	if setup.tabs.length == 0
		dummyTab = new exports.tab
		dummyTab2 = new exports.tab
		setup.tabs.push dummyTab
		setup.tabs.push dummyTab2

	specs =
		width : setup.superLayer.width / setup.tabs.length

	bar = new ios.View
		superLayer:setup.superLayer
		backgroundColor:"transparent"
		name:"tabBar"
		constraints:
			leading:0
			trailing:0
			height:setup.height

	bar.bg = new ios.View
		superLayer:bar
		name:".bg"
		constraints:
			leading:0
			trailing:0
			top:0
			bottom:0

	bar.divider = new ios.View
		backgroundColor:"#DFDEE0"
		name:".divider-bottom"
		superLayer:bar
		constraints:
			leading:0
			trailing:0
			height:.5

	bar.box = new ios.View
		superLayer:bar
		backgroundColor:"transparent"
		name:".box"
		constraints:
			leading:0
			trailing:0
			top:0
			bottom:0
	
	bar.activeDivider = new ios.View
		backgroundColor:"0D86ff"
		name:".divider-top"
		superLayer:bar		
		constraints:			
			bottom: 0
			height:.5
			width: specs.width

	if setup.type == "navBar"
		bar.constraints.top = setup.barTop
		bar.bg.constraints.top = 0
		bar.divider.y = setup.height
		bar.divider.height = 0.5
			
	else
		bar.constraints.bottom = 0
		bar.bg.constraints.bottom = 0
		bar.activeDivider.visible = false	

	setActive = (tabIndex) ->
		for tab, index in setup.tabs
			if index == tabIndex
				tab.setActive(true)
			else
				tab.setActive(false)

	bar.setBadgeValue = (tabIndex, value) =>
		# Adds a badge to the tab item if value is a number > 0 and removes the badge if null
		for tab, index in setup.tabs
			if index == tabIndex
				if value
					tab.badge.text = value
					tab.badge.visible = true
				else
					tab.badge.visible = false

	for tab, index in setup.tabs
		#Check for vaild tab object
		bar.box.addSubLayer(tab)

		# Change colors
		tab.label.color = ios.utils.color(setup.inactiveColor)
		bar.bg.backgroundColor = setup.backgroundColor

		if setup.blur
			bar.bg.backgroundColor = "rgba(255,255,255, .9)"
			ios.utils.bgBlur(bar.bg)
				
		if (setup.type == "navBar")
			tab.view.constraints.top = setup.barTop + setup.height
			tab.view.constraints.bottom = 0
			tab.constraints.bottom = 5
		else
			tab.view.constraints.top = setup.viewTop
			tab.view.constraints.height = tab.view.superLayer.height - setup.height - setup.viewTop
		
		tab.constraints.width = specs.width
		tab.constraints.height = setup.height		

		if index == 0
			tab.constraints.leading = 0
		else
			tab.constraints.leading = setup.tabs[index - 1]

		ios.layout.set(tab)

		tab.on Events.TouchStart, ->
			tabIndex = @.x / ios.utils.px(specs.width)
			setActive(tabIndex)
		tab.on Events.Click, ->
			bar.activeDivider.animate
				properties:					
					x: @.x
				curve: "spring(200, 23, 0)"
		
	bar.box.constraints =
		align:"horizontal"

	ios.layout.set(bar.box)
	setActive(setup.start)

	bar.tabs = setup.tabs

	return bar
