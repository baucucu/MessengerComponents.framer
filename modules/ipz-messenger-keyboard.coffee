

class IpzMessengerKeyboard extends Layer
    @keyboardUp = false
    @ratio = undefined
    @typeSpeed = undefined
    @key = undefined

    constructor:(options = {}) ->
        # TODO move in a props obj
        defaultWidth = 750
        defaultHeight = 432
        @typeSpeed = .5
        offset = 64

        @ratio = Screen.width/defaultWidth
        
        options.name ?= "Keyboard"
        options.y = Screen.height    
        options.width = defaultWidth*@ratio        
        options.height = defaultHeight*@ratio
        options.image = "images/keyboard/keyboard.png"
        options.clip = false

        super options

        @.states.animationOptions = {
            # TODO: Mimic the actual timing & curve
            time: @typeSpeed, curve: "ease-in-out"
        }

        @.states.add({
            show: { maxY: Screen.height - offset },
            hide: { y: Screen.height - offset }
        })

        @.createKeyHighlight()        

    show: (immediate = false) ->
        if immediate
            @.states.switchInstant("show")
        else
            @.states.switch("show")
        @keyboardUp = true
        
    hide : (immediate = true) ->
        if (@keyboardUp is true)
            if immediate
                @.states.switchInstant("hide")
            else
                @.states.switch("hide")
            @keyboardUp = false

    mockTyping: (textField, customEvent) ->
        filler_text = customEvent.message.split('')
        totalDelay = 0
        counter = 0
        textField.text = ''
        textField.style = color:'#333'

        keyboard = @

        typeLetter = (letter, delay, key, typeSpeed) ->
            totalDelay += typeSpeed
            Utils.delay totalDelay, ->
                counter += 1 
                key.visible = true
                textField.text += letter
                key.html = letter
                key.states.switchInstant(letter)
                if counter == filler_text.length
                    Utils.delay typeSpeed, ->
                        key.visible = false
                        
        for letter,i in filler_text
            typeLetter letter, i, @key, @typeSpeed
            total = i

        if (customEvent.returnDelay != undefined && customEvent.returnDelay > 0)
            Utils.delay customEvent.returnDelay, ->
                Screen.emit "SendMessage", textField.text
                textField.text = "Type a message"

        if (customEvent.hideDelay != undefined && customEvent.hideDelay > 0)
            Utils.delay customEvent.hideDelay, ->
                keyboard.hide(false)
                textField.text = "Type a message"
                

    createKeyHighlight: () ->        
        row1 = -114*@ratio
        row2 = -6*@ratio
        row3 = 102*@ratio
        space = 'images/keyboard/space.png'
        middle = 'images/keyboard/key_middle.png'
        left = 'images/keyboard/key_left.png'
        right = 'images/keyboard/key_right.png'

        # create the key layer
        @key = new Layer 
            superLayer:@
            width:163*@ratio
            height:222*@ratio
            image:middle           
            visible:false
        @key.html = ''	
        @key.style = 
            color:'#000'
            textAlign:'center'
            fontSize:'40px'
            fontWeight:'100'
            paddingTop:'48px'
            lineHeight:'40px'
            textTransform:'uppercase'
                
        # states for key positions		
        @key.states.add
            ' ':{x:237*@ratio,y:210*@ratio,image:space}
            '.':{visible:false},',':{visible:false}
            ':':{visible:false},';':{visible:false}
            '!':{visible:false},'?':{visible:false}
            '/':{visible:false},'@':{visible:false}
            '(':{visible:false},')':{visible:false}
            '{':{visible:false},'}':{visible:false}
            '[':{visible:false},']':{visible:false}
            # row 1
            q:{x:-18*@ratio,y:row1,image:left},Q:{x:-18*@ratio,y:row1,image:left}
            w:{x:31*@ratio,y:row1,image:middle},W:{x:31*@ratio,y:row1,image:middle}
            e:{x:106*@ratio,y:row1,image:middle},E:{x:106*@ratio,y:row1,image:middle}
            r:{x:181*@ratio,y:row1,image:middle},R:{x:181*@ratio,y:row1,image:middle}
            t:{x:256*@ratio,y:row1,image:middle},T:{x:256*@ratio,y:row1,image:middle}
            y:{x:331*@ratio,y:row1,image:middle},Y:{x:331*@ratio,y:row1,image:middle}
            u:{x:406*@ratio,y:row1,image:middle},U:{x:406*@ratio,y:row1,image:middle}
            i:{x:481*@ratio,y:row1,image:middle},I:{x:481*@ratio,y:row1,image:middle}
            o:{x:556*@ratio,y:row1,image:middle},O:{x:556*@ratio,y:row1,image:middle}
            p:{x:605*@ratio,y:row1,image:right},P:{x:605*@ratio,y:row1,image:right}
            # row 2
            a:{x:-7*@ratio,y:row2,image:middle},A:{x:-7*@ratio,y:row2,image:middle}
            s:{x:68*@ratio,y:row2,image:middle},S:{x:68*@ratio,y:row2,image:middle}
            d:{x:143*@ratio,y:row2,image:middle},D:{x:143*@ratio,y:row2,image:middle}
            f:{x:218*@ratio,y:row2,image:middle},F:{x:218*@ratio,y:row2,image:middle}
            g:{x:293*@ratio,y:row2,image:middle},G:{x:293*@ratio,y:row2,image:middle}
            h:{x:368*@ratio,y:row2,image:middle},H:{x:368*@ratio,y:row2,image:middle}
            j:{x:443*@ratio,y:row2,image:middle},J:{x:443*@ratio,y:row2,image:middle}
            k:{x:518*@ratio,y:row2,image:middle},K:{x:518*@ratio,y:row2,image:middle}
            l:{x:593*@ratio,y:row2,image:middle},L:{x:593*@ratio,y:row2,image:middle}
            # row 3
            z:{x:68*@ratio,y:row3,image:middle},Z:{x:68*@ratio,y:row3,image:middle}
            x:{x:143*@ratio,y:row3,image:middle},X:{x:143*@ratio,y:row3,image:middle}
            c:{x:218*@ratio,y:row3,image:middle},C:{x:218*@ratio,y:row3,image:middle}
            v:{x:293*@ratio,y:row3,image:middle},V:{x:293*@ratio,y:row3,image:middle}
            b:{x:368*@ratio,y:row3,image:middle},B:{x:368*@ratio,y:row3,image:middle}
            n:{x:443*@ratio,y:row3,image:middle},N:{x:443*@ratio,y:row3,image:middle}
            m:{x:518*@ratio,y:row3,image:middle},M:{x:518*@ratio,y:row3,image:middle}

module.exports = IpzMessengerKeyboard