import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

export default function NavierStokesExplorer() {
  return (
    <BrowserOnly fallback={<div className={styles.fallback}>Loading visualization…</div>}>
      {() => {
        const Explorer = require('./Explorer').default;
        return <Explorer />;
      }}
    </BrowserOnly>
  );
}
