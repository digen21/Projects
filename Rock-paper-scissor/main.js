const game = ()=>{

    let pScore = 0; //Player Score
    let cScore = 0; //Computer Score
    


    //Start the game
    const startGame = ()=>{
        
        const playBtn = document.querySelector('.intro button');        //Let's play Button

        const introScreen = document.querySelector('.intro');

        const matchScreen = document.querySelector('.match');


        playBtn.addEventListener('click', () =>{
            introScreen.classList.add('fadeOut');     //It will disappear when click on lets play (Properties are in css created for that)
            
            matchScreen.classList.add('fadeIn');      //It will appear when click on lets play    (Properties are in css created for that)
        });
    };


    //Play Match

    const playMatch = ()=>{
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const ComputerHand = document.querySelector('.computer-hand');

        const hands = document.querySelectorAll('.hands img'); 


        hands.forEach(hand => {
            hand.addEventListener('animationend', function(){
                this.style.animation = "";
            })
        })


        //Compter Options That Generate Randomly
        const computerOpt = ['rock', 'paper', 'scissor'];

       options.forEach(option =>{
            option.addEventListener('click', function(){
                // console.log(this);

                //Computer Choice
                
                setTimeout(() =>{
                  

                    playerHand.src = `${this.textContent}.png`;
                ComputerHand.src = `${computerChoice}.png`;

                    compareHands(this.textContent, computerChoice);

               
                }, 2000);

                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOpt[computerNumber];     //Will game any random from the "computerOpt" Array

                
                // compareHands(this.textContent, computerChoice);
                
                
                // console.log(computerChoie);
                


                // Animation
                playerHand.style.animation = "shakePlayer 2s ease";
                ComputerHand.style.animation = "shakeComputer 2s ease";

            });
       });

        
       
        // console.log(computerNumber);

        // computerOpt[computerNumber]

    };


    const updateScore =  () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');

        playerScore.textContent = pScore;
        computerScore.textContent = cScore;

        // for reset game !!!!!  Not Working !!

        // if(pScore == 10){                        
        //     playerScore.textContent = 0;
        //     computerScore.textContent = 0;
        //     updateScore();
        //     return;
            
        // }
        // else if(cScore == 10){
        //     playerScore.textContent = 0;
        //     computerScore.textContent = 0;
        //     updateScore();
        //     return;
        // }

        
    };
        



        const compareHands = (playerChoice, computerChoice) =>{
        //Comparing Haands

        const winner = document.querySelector('.winner');


        //Checking For Tie
        if(playerChoice === computerChoice){
            winner.textContent = "It Is A Tie";
            console.log("tie");
            return;
        }


        //Checking For Wrong

        if(playerChoice === 'rock'){
            if(computerChoice === 'scissor'){
                winner.textContent = "Player Wins";
                pScore++;
                console.log(pScore++);
                updateScore();
                return;
            }
            else{
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
        }
        if(playerChoice === 'paper'){
            if(computerChoice === 'scissor'){
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
            else{
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }
        if(playerChoice === 'scissor'){
            if(computerChoice === 'rock'){
                winner.textContent = "Computer Wins";;
                cScore++;
                updateScore();
                return;
            }
            else{
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }


        



    }



    startGame();
    playMatch();

};








//calling main function

game();
