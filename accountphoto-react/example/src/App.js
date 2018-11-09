import React, { Component } from 'react'

import AccountPhoto from 'accountphoto-react'

export default class App extends Component {
  render () {
    return (
      <div>
        {/* example account does not have a linked photo... */}
        <AccountPhoto account='accountphoto' />

        {/* example account if photo is linked... */}
        <AccountPhoto account='blockexpress' />
      </div>
    )
  }
}
