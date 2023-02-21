import classes from './newsletter-registration.module.css';
import { useRef } from "react";

function NewsletterRegistration() {
  const inputRef = useRef(null);

  function registrationHandler(event) {
    event.preventDefault();
    console.log('hello');
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: inputRef.current.value }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.json());
        inputRef.current.value = '';
      })
      .then(err => console.log(err))
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={inputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
