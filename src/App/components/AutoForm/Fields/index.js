import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Param from './Param'
import includes from 'lodash/includes'

export default class Fields extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    schemaToField: PropTypes.func,
    parent: PropTypes.any,
    omit: PropTypes.array
  }

  renderFields(params) {
    if (!params) return
    if (Object.keys(params).length === 0) return

    return Object.keys(params)
      .filter(key => !includes(this.props.omit, key))
      .map(key => {
        return (
          <Param
            key={key}
            parent={this.props.parent}
            field={params[key]}
            fieldName={key}
            schemaToField={this.props.schemaToField}
          />
        )
      })
  }

  render() {
    return <div className={styles.container}>{this.renderFields(this.props.params)}</div>
  }
}
