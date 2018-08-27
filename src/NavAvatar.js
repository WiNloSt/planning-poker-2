import React from 'react'
import { Avatar, Popover, Button } from 'antd'

import { Consumer } from './store'
import { Condition } from './components/Condition'
import { auth } from './firebase'

export function NavAvatar() {
  return (
    <Consumer>
      {({ authUser }) => (
        <Condition.True condition={authUser}>
          {() => (
            <Popover
              title={authUser.email}
              content={
                <div className="cf">
                  <Button className="fr" onClick={auth.doSignOut}>
                    Sign out
                  </Button>
                </div>
              }
              placement="bottomRight"
              arrowPointAtCenter
              trigger="click">
              <Avatar className="pointer" src={authUser.photoURL} />
            </Popover>
          )}
        </Condition.True>
      )}
    </Consumer>
  )
}
