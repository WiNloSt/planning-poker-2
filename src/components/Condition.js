import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

const renderChildren = children => (typeof children === 'function' ? children() : children)

const getComponentName = element => element.displayName || element.name

const isSameComponent = (a, b) =>
  process.env.NODE_ENV === 'production' ? a === b : getComponentName(a) === getComponentName(b)

export const Condition = ({ condition, children }) => {
  let accCondition = true
  return (
    <React.Fragment>
      {React.Children.map(children, child => {
        if (isSameComponent(child.type, Condition.If)) {
          const condition = accCondition && child.props.condition
          accCondition = accCondition && !child.props.condition
          return React.cloneElement(child, { condition })
        } else if (
          isSameComponent(child.type, Condition.True) ||
          isSameComponent(child.type, Condition.False)
        ) {
          return React.cloneElement(child, {
            condition: child.props.condition !== undefined ? child.props.condition : condition
          })
        } else {
          return child
        }
      })}
    </React.Fragment>
  )
}
Condition.propTypes = {
  condition: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
}

const True = ({ condition, children }) =>
  condition !== undefined && !!condition && renderChildren(children)
const False = ({ condition, children }) =>
  condition !== undefined && !condition && renderChildren(children)
// Exactly doing like True but we need another cllass for checking in the parent Condition component
const If = True.bind({})

Condition.True = True
Condition.False = False
Condition.If = If
Condition.ElseIf = If // alias of If
