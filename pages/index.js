import { useRef, useState } from "react";

function HomePage() {
  const emailInput = useRef();
  const feedbackInput = useRef();

  const [feedbackItems, setFeedbackItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const feedback = feedbackInput.current.value;
    const reqBody = {
      email: email,
      feedback: feedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your Email Adress</label>
          <input type="email" id="email" ref={emailInput} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInput} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedback</button>
      {feedbackItems &&
        feedbackItems.map((item) => (
          <div key={item.id}>
            <h3>{item.email}</h3>
            <div>{item.feedback}</div>
          </div>
        ))}
    </div>
  );
}

export default HomePage;
