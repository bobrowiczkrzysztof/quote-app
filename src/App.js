import React from 'react';
import './App.css';
let i = 0;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      previousQuotes: [],
    };
  }

  componentDidMount() {
    fetch(
      'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
    )
      .then(response => response.json())
      .then(data => {
        let randomNum = Math.floor(Math.random() * data.length);
        return this.setState({
          quote: data[randomNum]['quote'],
          author: data[randomNum]['author'],
        });
      })
      .catch(err =>
        this.setState({
          quote: 'Error: something is wrong. Please try again',
          author: 'unknown',
        })
      );
  }
  getNextQuote() {
    this.componentDidMount();
    if (
      !this.state.previousQuotes.some(obj => obj.quote === this.state.quote)
    ) {
      this.setState(state => ({
        previousQuotes: state.previousQuotes.concat({
          quote: state.quote,
          author: state.author,
        }),
      }));
    }
    i = this.state.previousQuotes.length + 1;
  }
  getPreviousQuote() {
    if (i !== 0 && this.state.previousQuotes.length !== 0) {
      --i;
      if (this.state.previousQuotes[i] !== undefined) {
        this.setState(state => ({
          quote: state.previousQuotes[i].quote,
          author: state.previousQuotes[i].author,
        }));
      }
    }
  }
  render() {
    return (
      <div id="container">
        <div id="quotes-container">
          <q id="text">{this.state.quote}</q>
          <p id="author">-{this.state.author}</p>
          <div>
            <button id="next-quote" onClick={this.getNextQuote.bind(this)}>
              Next quote
            </button>
            <button
              id="previous-quote"
              onClick={this.getPreviousQuote.bind(this)}
            >
              Previous quotes
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
