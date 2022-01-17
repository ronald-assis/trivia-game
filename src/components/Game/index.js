import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// class Game extends Component {
//   constructor(props) {
//     super(props);

//     this.borderAnswer = this.borderAnswer.bind(this);
//     this.eraseBorders = this.eraseBorders.bind(this);

//     this.state = {
//       correct: '',
//       incorrect: '',
//       hasResponded: false,
//     };
//   }

//   componentDidUpdate() {
//     const { timesUp } = this.props;
//     const { hasResponded } = this.state;
//     if (timesUp) this.borderAnswer();
//     else if (timesUp && hasResponded) this.eraseBorders();
//   }

//   borderAnswer() {
//     const { stopCounting } = this.props;
//     stopCounting();
//     this.setState({
//       correct: 'green-border',
//       incorrect: 'red-border',
//       hasResponded: true,
//     });
//   }

//   eraseBorders() {
//     this.setState({
//       correct: '',
//       incorrect: '',
//       hasResponded: false,
//     });
//   }

//   render() {
//     const { correct, incorrect } = this.state;
//     const { answers } = this.props;
//     return (
//       <div
//         data-testid="answer-options"
//       >
//         {answers.map(({ answer, answerCorrect }, index) => (
//           answerCorrect
//             ? (
//               <button
//                 key="correct"
//                 type="button"
//                 data-testid="correct-answer"
//                 className={ correct }
//                 onClick={ this.borderAnswer }
//               >
//                 {answer}
//               </button>
//             )
//             : (
//               <button
//                 key={ index }
//                 type="button"
//                 data-testid={ `wrong-answer-${index}` }
//                 className={ incorrect }
//                 onClick={ this.borderAnswer }
//               >
//                 {answer}
//               </button>)
//         ))}
//       </div>
//     );
//   }
// }

const Game = ({ answers, timesUp, stopCounting }) => {
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswer, setIncorrectAnswer] = useState('');

  const eraseBorders = () => {
    setCorrectAnswer('');
    setIncorrectAnswer('');
  };

  const borderAnswer = () => {
    setCorrectAnswer('green-border');
    setIncorrectAnswer('red-border');
  };

  useEffect(() => {
    eraseBorders();
  }, [answers]);

  useEffect(() => {
    if (timesUp) {
      borderAnswer();
      stopCounting();
    } else {
      eraseBorders();
    }
  }, [timesUp, stopCounting]);

  return (
    <div
      data-testid="answer-options"
    >
      {answers.map(({ answer, answerCorrect }, index) => (
        answerCorrect
          ? (
            <button
              key="correct"
              type="button"
              data-testid="correct-answer"
              className={ correctAnswer }
              onClick={ borderAnswer }
              disabled={ timesUp }
            >
              {answer}
            </button>
          )
          : (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              className={ incorrectAnswer }
              onClick={ borderAnswer }
              disabled={ timesUp }
            >
              {answer}
            </button>)
      ))}
    </div>
  );
};

Game.propTypes = {
  timesUp: PropTypes.bool.isRequired,
  stopCounting: PropTypes.func.isRequired,
  answers: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Game;
