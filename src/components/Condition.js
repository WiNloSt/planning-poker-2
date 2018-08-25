import React from 'react'

export const Condition = ({ condition, children }) => (
  <React.Fragment>
    {React.Children.map(children, child => React.cloneElement(child, { condition }))}
  </React.Fragment>
)

const True = ({ condition, children }) => !!condition && children()
const False = ({ condition, children }) => !condition && children()

Condition.True = True
Condition.False = False
