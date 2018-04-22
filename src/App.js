import React, { Component } from "react";
import Navbar from './components/Navbar/Navbar.js';
import Modal from './components/Modal/Modal.js';
import CharacterCard from './components/CharacterCard/CharacterCard.js';
import Footer from './components/Footer/Footer.js';
import cards from './characters.json';

import './index.css';


class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            cards: cards,
            score: 0,
            topScore: 0,
            clickedCards: [],
			      ids : [1,2,3,4,5,6,7,8,9,10,11,12],            
            footerText: ""
        }

        this.reArrangeCards = this.reArrangeCards.bind(this); 
        this.clickedCharacter = this.clickedCharacter.bind(this); 
    }
    
       
  clickedCharacter = (id) => {
    const [pageBody] = document.getElementsByTagName('body');

    var footText = this.state.footerText,
        clicked = this.state.clickedCards,
        score = this.state.score,
        topScore = this.state.topScore,
        ids = this.state.ids
  
      if (clicked.includes(id)) {
        pageBody.classList.add('shakeWrapper');
        this.setState({footerText: 'You picked that already! Start Over.'})
        setTimeout(() => {
          pageBody.classList.remove('shakeWrapper');
        }, 500);
        score = 0;
        clicked.length = 0;
        setTimeout(() => {
          this.setState({footerText: ""})
        }, 1800)



    
      }
      else {
        clicked.push(id);
        console.log("clicked is ", clicked);
        score  += 1;
        ids = this.reArrangeCards(ids);
        topScore = score > topScore ? score : topScore;
        console.log("id is", id);
        console.log("score", score);
        console.log();

        if (score === 11) {
          this.setState({footerText: 'You Won! Play again?'})
          score = 0;
          setTimeout(() => {
            this.setState({footerText: ""})
          }, 1800)
        } 
      }

      
    this.setState({
      footText,
      clicked,
      score,
      topScore,
      ids
    })
  }

  reArrangeCards = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
    //   And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array; 
  }

  renderCards = (array) => {
    return this.state.cards.map(card => (
      <section className='col s4 m3 l3' key={card.id} id={card.id}>
        <CharacterCard
          name={card.name} 
          image={card.image} 
          cardId={card.id}
          reArrangeCards={() => {this.reArrangeCards(cards)}}
          clickedCharacter={() => {this.clickedCharacter(card.id)}}/>
      </section>
      )
    )
  }


  render() {
    return (
      <div className="container-fluid">
        <Navbar score={this.state.score} topScore={this.state.topScore}/>
        <Modal />
        <br />
        <div className="container row cardWrapper">
          {this.renderCards(this.state.cards)}
        </div>
        <Footer text={this.state.footerText}/>
      </div>
    );
  }
}





export default App;




