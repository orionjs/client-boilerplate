import React from 'react'
import styles from './styles.css'
import {Link} from 'react-router-dom'

export default class NotFound extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <p>No se encontró esta página</p>
        <div>
          <Link to="/">Volver</Link>
        </div>
      </div>
    )
  }
}
