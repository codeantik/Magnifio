import React from 'react';
import './result.css';
import './resultDark.css';

export default function Result() {
  const data = [
    {id:"1"},{id:"2"},{id:"3"},{id:"4"},{id:"5"},{id:"6"},{id:"7"},{id:"8"},{id:"9"},{id:"10"},
    {id:'11'},{id:'12'},{id:'13'}
  ]
  return (
    <>
      <div className="result-container">
        {data.map((r,index) => {
          return (
            <div className="result-list" key={index}>
              <img
                src="https://i.ibb.co/st0dLx7/slack.png"
                alt="comapny logo"
              />
              <div className="result-metadata">
                <strong className="result-title">
                  20 best food quotes from the best chefs- Great saying about eating
                </strong>
                <span className="result-post-timing">3hours ago .</span>
                {/*<span className="post-user-name">Shreeven</span>*/}
                <span className="result-description">
                Explore and share the best hand-curated food quotes from popular chefs, famous cooks, your favorite food writers, and more.
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}