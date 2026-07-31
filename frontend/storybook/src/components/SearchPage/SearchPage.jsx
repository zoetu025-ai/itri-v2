import { Logo } from '../Logo/Logo.jsx';
import { SearchBar } from '../SearchBar/SearchBar.jsx';
import { assetPath } from '../../lib/assetPath.js';
import styles from './SearchPage.module.css';

export function SearchPage({
  title = 'Welcome to iCourt',
  disclaimer = `Search results aren't saved but are used to improve iCourt AI.\nFor safety, data is retained for 72 hours.`,
  copyright = 'Copyright® CSI Technology Group',
  searchProps = {},
}) {
  const disclaimerLines = disclaimer.split('\n');

  return (
    <div className={styles.page}>
      <div className={styles.background} aria-hidden="true">
        <img
          src={assetPath('/assets/images/background-light.png')}
          alt=""
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundGradient} />
      </div>

      <main className={styles.content}>
        <Logo className={styles.logo} />

        <h1 className={styles.title}>{title}</h1>

        <p className={styles.disclaimer}>
          {disclaimerLines.map((line, index) => (
            <span key={line}>
              {line}
              {index < disclaimerLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>

        <SearchBar className={styles.searchBar} {...searchProps} />
      </main>

      <footer className={styles.footer}>{copyright}</footer>
    </div>
  );
}
