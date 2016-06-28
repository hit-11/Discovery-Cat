(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.langPref", {
        gradeNames: "fluid.phaser.state",
        langSelectionPhrases: {
            en: "Hey! I can help you",
            es: "¡Oye! Puedo ayudarle",
            fr: "Hey! je peux vous aider",
            de: "Hallo! ich kann Ihnen helfen"
        },
        invokers: {
            preload: {
                funcName: "demo.state.langPref.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.langPref.create",
                args: "{that}"
            },
            update: {
                funcName: "demo.state.langPref.update",
                args: "{that}"
            },
            catMove: {
                funcName: "demo.state.langPref.catMove",
                args: "{that}"
            },
            catAnimationStop: {
                funcName: "demo.state.langPref.catAnimationStop",
                args: "{that}"
            },
            ratsCome: {
                funcName: "demo.state.langPref.ratsCome",
                args: "{that}"
            },
            ratAnimationStop: {
                funcName: "demo.state.langPref.ratAnimationStop",
                args: "{that}"
            },
            messageAppear: {
                funcName: "demo.state.langPref.messageAppear",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech"]
            },
            messageSpeechEn: {
                funcName: "demo.state.langPref.messageSpeech",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech", "en", "en-US"]
            },
            messageSpeechEs: {
                funcName: "demo.state.langPref.messageSpeech",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech", "es", "es-MX"]
            },
            messageSpeechFr: {
                funcName: "demo.state.langPref.messageSpeech",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech", "fr", "fr-FR"]
            },
            messageSpeechDe: {
                funcName: "demo.state.langPref.messageSpeech",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech", "de", "de"]
            },
            changeSelection: {
                funcName: "demo.state.langPref.changeSelection",
                args: "{that}"
            },
            acceptSelection: {
                funcName: "demo.state.langPref.acceptSelection",
                args: "{that}"
            },
            button1Callback: {
                funcName: "demo.state.langPref.buttonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model", "en-US"]
            },
            button2Callback: {
                funcName: "demo.state.langPref.buttonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model", "es-MX"]
            },
            button3Callback: {
                funcName: "demo.state.langPref.buttonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model", "fr-FR"]
            },
            button4Callback: {
                funcName: "demo.state.langPref.buttonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model", "de"]
            }
        }
    });

    // Runs at t = 0ms
    // Cat movement to the first location
    demo.state.langPref.catMove = function(that) {
        that.cat.animations.play("walk");
        that.add.tween(that.cat).to({ x: 500, y:150 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 2000ms
    // Cat animation stop after its entry
    demo.state.langPref.catAnimationStop = function(that) {
        that.cat.animations.paused = true;
    };

    // Runs at t = 2200ms
    // All rats entry into the scene
    demo.state.langPref.ratsCome = function(that) {
        that.rat1.animations.play("walk");
        that.rat2.animations.play("walk");
        that.rat3.animations.play("walk");
        that.rat4.animations.play("walk");
        that.add.tween(that.rat1).to({ x: 1050, y:200 },
                                        4000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.rat2).to({ x: 900, y:400 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.rat4).to({ x: 400, y:500 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.rat3).to({ x: 650, y:500 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 8200ms
    // Pauses all rat animations
    demo.state.langPref.ratAnimationStop = function(that) {
        that.rat1.animations.paused = true;
        that.rat2.animations.paused = true;
        that.rat3.animations.paused = true;
        that.rat4.animations.paused = true;
    };

    demo.state.langPref.messageSpeech = function(that, speechComp, phrase, langIn) {
        console.log(typeof(phrase));
        // Here used this for [] for instead of directly .phrase, because phrase was being
        // returned as a string
        speechComp.queueSpeech(that.options.langSelectionPhrases[phrase],
                                false, { lang: langIn });
    };

    // Runs at t = 8500ms
    // Creates messageBoxes(we call them button because we have used buttons to implement them)
    // and adds text as child. Also here onOver we have added the speechFunction.
    demo.state.langPref.messageAppear = function(that) {
        that.button1 = that.add.button(870, 100, "messageBoxlp",
                                        that.button1Callback, that, 1, 0, 2);
        that.button1.addChild(that.add.text(70, 48, that.options.langSelectionPhrases.en));
        that.button1.onInputOver.add(that.messageSpeechEn, that);

        that.button2 = that.add.button(870, 300, "messageBoxlp",
                                        that.button2Callback, that, 1, 0, 2);
        that.button2.addChild(that.add.text(70, 48, that.options.langSelectionPhrases.es));
        that.button2.onInputOver.add(that.messageSpeechEs, that);

        that.button3 = that.add.button(500, 400, "messageBoxlp",
                                        that.button3Callback, that, 1, 0, 2);
        that.button3.addChild(that.add.text(60, 48, that.options.langSelectionPhrases.fr));
        that.button3.onInputOver.add(that.messageSpeechFr, that);

        that.button4 = that.add.button(100, 400, "messageBoxlp",
                                        that.button4Callback, that, 1, 0, 2);
        that.button4.addChild(that.add.text(25, 48, that.options.langSelectionPhrases.de));
        that.button4.onInputOver.add(that.messageSpeechDe, that);
    };

    // Actions to be performed on pressing TAB
    demo.state.langPref.changeSelection = function(that) {
        if (that.count === 4) {
            that.count = 0;
        }
        that.count++;
        switch (that.count) {
            case 1:
                // Fix the over, out, in states of last button
                that.button4.setFrames(1, 0, 2);
                // Change the over, out, in states of this button
                that.button1.setFrames(0, 1, 2);
                // For Speech
                that.messageSpeechEn();
                break;
            case 2:
                that.button1.setFrames(1, 0, 2);
                that.button2.setFrames(0, 1, 2);
                that.messageSpeechEs();
                break;
            case 3:
                that.button2.setFrames(1, 0, 2);
                that.button3.setFrames(0, 1, 2);
                that.messageSpeechFr();
                break;
            case 4:
                that.button3.setFrames(1, 0, 2);
                that.button4.setFrames(0, 1, 2);
                that.messageSpeechDe();
                break;
            default:
        }
    };

    // Actions to be performed on pressing ENTER
   demo.state.langPref.acceptSelection = function(that) {
          switch (that.count) {
            case 1:
                that.button1Callback();
                break;
            case 2:
                that.button2Callback();
                break;
            case 3:
                that.button3Callback();
                break;
            case 4:
                that.button4Callback();
                break;
            default:
                // Remember for default to put something
        }
    };

    // All four buttons callbacks are handled by this, to add web speech and lang selection here
    demo.state.langPref.buttonCallback = function(that, model, language) {
        model.lang.type = language;
        model.lang.obj = that.cache.getJSON(language);
        // To remove keys so that they dont flood the browser
        that.state.start("houseEntry");
    };

    // Phaser functions
    demo.state.langPref.preload = function() {

    };

    demo.state.langPref.create = function(that) {
        // count to be later added to the model, this is responsible for selection using tab
        that.count = 0;

        that.add.sprite(0, 0, "backgroundlp");

        // Cat in the scene
        that.cat = that.add.sprite(170, 90, "catMovelp", 1);
        that.cat.scale.setTo(0.8, 0.8);
        that.cat.animations.add("walk", [0, 1, 2, 3], 5, true);

        // All four rats with accessories as child of them
        that.rat1 = that.add.sprite(1500, 200, "buddiesMovelp", 0);
        that.rat1.addChild(that.add.sprite(55, -10, "ratAccessorieslp", 0));
        that.rat1.scale.setTo(0.5, 0.5);
        that.rat1.animations.add("walk", [0, 1, 2, 3], 5, true);
        that.rat1.animations.play("walk");

        that.rat2 = that.add.sprite(1500, 400, "buddiesMovelp", 0);
        that.rat2.addChild(that.add.sprite(85, -45, "ratAccessorieslp", 1));
        that.rat2.scale.setTo(0.5, 0.5);
        that.rat2.animations.add("walk", [0, 1, 2, 3], 5, true);
        that.rat2.animations.play("walk");

        that.rat3 = that.add.sprite(650, 1000, "buddiesMovelp", 0);
        that.rat3.addChild(that.add.sprite(80, 90, "ratAccessorieslp", 3));
        that.rat3.scale.setTo(0.5, 0.5);
        that.rat3.animations.add("walk", [0, 1, 2, 3], 5, true);
        that.rat3.animations.play("walk");

        that.rat4 = that.add.sprite(400, 1000, "buddiesMovelp", 0);
        that.rat4.addChild(that.add.sprite(60, 70, "ratAccessorieslp", 2));
        that.rat4.scale.setTo(0.5, 0.5);
        that.rat4.animations.add("walk", [0, 1, 2, 3], 5, true);
        that.rat4.animations.play("walk");

        // time events
        that.time.events.add(0, that.catMove, that);
        that.time.events.add(2000, that.catAnimationStop, that);
        that.time.events.add(2200, that.ratsCome, that);
        that.time.events.add(8200, that.ratAnimationStop, that);
        that.time.events.add(8500, that.messageAppear, that);

        // Keyboard controls for changing and accepting selections
        that.key1 = that.input.keyboard.addKey(Phaser.Keyboard.TAB);
        // Add adds the keyboard Input to the browser on the other hand addOnce adds it to
        // single state, which is what we desire here.
        that.key1.onDown.addOnce(that.changeSelection, that);

        // Enter and Space both are for accepting selection
        that.key2 = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        that.key2.onDown.addOnce(that.acceptSelection, that);

        that.key3 = that.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        that.key3.onDown.addOnce(that.acceptSelection, that);
    };

    demo.state.langPref.update = function() {

    };

})(jQuery, fluid);