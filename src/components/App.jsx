import React, { useState } from 'react';
import { Section } from './Section/Section';
import { FeedBackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
export const App = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const handelClick = event => {
    setState(prevState => {
      const { name } = event.target;
      return { ...state, [name]: prevState[name] + 1 };
    });
  };

  const total = state.good + state.bad + state.neutral;

  const positivePercentage = !total
    ? 0
    : Math.round((state.good / total) * 100);

  const { good, neutral, bad } = state;
  const options = Object.keys(state);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Please leave feedback">
        <FeedBackOptions options={options} onLeaveFeedback={handelClick} />
      </Section>
      {total ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};
