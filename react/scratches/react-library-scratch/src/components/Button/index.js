import React from 'react'
import styles from './button.module.scss'

const Button = ({message = 'Hello world'}) => (
  <button className={styles.btn}>{message}</button>
)

export default Button
