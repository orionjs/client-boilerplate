import React from 'react'
import styles from './styles.css'

export default class Logo extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <img className={styles.logo} src="/logo.svg" alt="Logo" />
      </div>
    )
  }
}
