import React, {
  useState,
  useEffect,
} from 'react';
import { ReactComponent as Logo } from './logo.svg';
import styles from './Welcome.module.css';
// import { loader  } from 'graphql.macro';

function Welcome() {
  const [ isLoadHeader, ] = useState(true)

  let Header = function() {
    return null
  }

  useEffect(function() {
    import('../Header')
      .then(({ default: Elem }) => {
        console.log(Elem)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className={styles.app}>
      {
        isLoadHeader ? "Loading..." : <Header />
      }

      <header className={styles.appHeader}>
        <Logo className={styles.appLogo} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Welcome;
