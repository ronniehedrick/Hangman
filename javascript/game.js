    //object
    var Hangman = {

        word: "",
        letter: "",
        correct: "",
        reload: false,
        firstKey: false,
        numAttempts: 10,
        counter: 0,
        loss: 0,
        win: 0,
        used: document.getElementById("used"),
        attempts: document.getElementById("attempts"),
        word_img: document.getElementById("word"),
        ll: document.getElementById("loss"),
        ww: document.getElementById("win"),
        // arrays
        letter_holder: [],
        word_letters: [],
        word_holder: [],
        used_letter: [],
        gameDictionary: ["acres", "adult", "advice", "arrangement", "attempt", "August", "Autumn", "border", "breeze", "brick", "calm", "canal", "Casey", "cast", "chose", "claws", "coach", "constantly", "contrast", "cookies", "customs", "damage", "Danny", "deeply", "depth", "discussion", "doll", "donkey", "Egypt", "Ellen", "essential", "exchange", "exist", , "explanation", "facing", "filmfinest", "fireplace", "floating", "folks", "fort", "garage", "grabbed", "grandmother", "habit", "happily", "Harry", "heading", "Illinois", "independent", "January", "label", "lungs", "Martin", "mathematics", "melted", "memory", "mill", "mission", "monkey", "Mount", "mysterious", "neighborhood", "Norway", "nuts", "occasionally", "official", "ourselves", "palace", "Pennsylvania", "Philadelphia", "plates", "poetry", "policeman", "positive", "possibly", "practical", "pride", "promised", "recall", "relationship", "remarkable", "require", "rhyme", "rocky", "rubbed", "rush", "sale", "satellites", "satisfied", "scared", "selection", "shake", "shaking", "shallow", "shout", "silly", "simplest", "slight", "slip", "slope", "soap", "solar", "species", "spin", "swung", "tales", "thumb", "tobacco", "toy", "trap", "treated", "tune", "University", "vapor", "vessels", "wealth", "wolf", "zoo"],

        // select a random word from the list and remove it 
        selectWord: function() {
            var list_len = this.gameDictionary.length;
            var rand_num = Math.floor(Math.random() * list_len - 1);
            var selected_word = this.gameDictionary.splice(rand_num, 1);
            return selected_word;
        },

        // create ul for selected word
        createWord: function(word) {
            this.word_holder = document.getElementById('main_game');
            this.correct = document.createElement('ul');

            var str_word = word.toString();

            for (var i = 0; i < str_word.length; i++) {
                this.correct.setAttribute('id', 'my-word');
                letter = document.createElement('li');
                letter.setAttribute('class', 'letter');
                if (str_word.charAt(i) === " ") {
                    letter.innerHTML = " ";
                    this.counter++;
                    this.word_letters.push(str_word.charAt(i));
                } else if (str_word.charAt(i) === "'") {
                    letter.innerHTML = "'";
                    this.counter++;
                    this.word_letters.push(str_word.charAt(i));
                } else {
                    letter.innerHTML = "_";
                    this.word_letters.push(str_word.charAt(i));
                }
                this.letter_holder.push(letter);
                this.word_holder.appendChild(this.correct);
                this.correct.appendChild(letter);
            }
        },


        resetGame: function() {
            this.counter = 0;
            this.numAttempts = 10;
            this.word_letters = [];
            this.used_letter = [];
            this.letter_holder = [];
            this.word_holder = [];
            this.correct.innerHTML = "";
            this.attempts.innerHTML = "";
            this.word_img.innerHTML = "";
            this.firstKey = true;

        },


        loadGame: function() {
            // Initialize the game
            var word = this.selectWord();
            this.word = word.toString(); // this is to show the answer
            Hangman.createWord(word);
            this.attempts.innerHTML = "Press a letter key to start!";
            this.used.innerHTML = "";
            this.ll.innerHTML = "Deaths  :" + this.loss;
            this.ww.innerHTML = "Pardons :" + this.win;
        },

        checkMatch: function(input) {
            var input_lower = input.toLowerCase();
            var index_input = this.used_letter.indexOf(input);
            var index_L = this.word_letters.indexOf(input_lower);
            var index_U = this.word_letters.indexOf(input);

            if (index_input < 0) {
                this.used_letter.push(input);
                this.used.innerHTML = this.used_letter;
                if (index_L < 0 && index_U < 0) {
                    this.numAttempts--;
                } else {
                    //loop for checking lowercase match
                    for (i = 0; i < this.word_letters.length; i++) {
                        if (input_lower === this.word_letters[i]) {
                            this.letter_holder[i].innerHTML = input_lower;
                            this.counter++;
                        }
                    }
                    //loop for checking uppercase match
                    for (i = 0; i < this.word_letters.length; i++) {
                        if (input === this.word_letters[i]) {
                            this.letter_holder[i].innerHTML = input;
                            this.counter++;
                        }
                    }
                }
            }
        },

        //function to show current number of attemps left
        displayAttempts: function() {
            this.attempts.innerHTML = this.numAttempts + " attempts left.";
            if (this.numAttempts < 1) {
                this.attempts.innerHTML = "DEFEATED! Press any key to start a new game";
                this.loss += 1;
                this.ll.innerHTML = "Deaths  :" + this.loss;
                this.correct.innerHTML = this.word;
                this.word_img.innerHTML = "";
                this.reload = true;
                this.firstKey = true;

            }
            if (this.counter === this.word_letters.length) {
                this.attempts.innerHTML = "Congratulations Press any key to start a new game";
                this.win += 1;
                this.ww.innerHTML = "Pardons :" + this.win;
                this.reload = true;
                this.firstKey = true;
            }
        },


        // display when a user types in something other than a letter
        displayErr: function() {
            this.attempts.innerHTML = "That's not a letter";
        }
    }

    // start all this below when window loads
    window.onload = function() {
        // Initialize the game
        Hangman.loadGame();


        // when user presses anything on keyboard
        document.onkeyup = function(event) {
            // check if loading a new game from a previous game
            if (Hangman.reload) {
                Hangman.reload = false;
                Hangman.resetGame();
                Hangman.loadGame();

            }
            // check if first key pressed to start
            if (Hangman.firstKey) {
                Hangman.firstKey = false;
            } else {
                // Captures the key press, converts it to uppercase, and saves it to a variable.
                var user_input = String.fromCharCode(event.keyCode).toUpperCase();
                if (user_input.charCodeAt(0) >= 65 && user_input.charCodeAt(0) <= 90) {
                    Hangman.checkMatch(user_input);
                    Hangman.displayAttempts();
                } else {
                    Hangman.displayErr();
                }
            }
        }
    }
