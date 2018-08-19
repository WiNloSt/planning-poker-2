import React from 'react'

export const Condition = ({ condition, children }) => (
  <React.Fragment>
    {React.Children.map(children, child => React.cloneElement(child, { condition }))}
  </React.Fragment>
)

const T = ({ condition, children }) => !!condition && children()
const F = ({ condition, children }) => !condition && children()

Condition.T = T
Condition.F = F
