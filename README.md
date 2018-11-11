# AccountPhoto
AccountPhoto is a decentralized application or (dApp) for the EOS blockchain. It provides a way for users to globally link a photo to their account. **Think Gravatar, but decentralized.**


![AccountPhoto Screenshot](https://raw.githubusercontent.com/zachalam/AccountPhoto/master/frontend/public/ap-screen.png)

## React Integration
If you run your own EOS dApp, you can provide a more personalized experience by integrating AccountPhoto into your service. It only takes a few lines of code.

1. Install
```
npm install accountphoto-react
```

2. Add
```
import React, { Component } from 'react'
 
import AccountPhoto from 'accountphoto-react'
 
class Example extends Component {
  render () {
    return (
      // simply add `account` name as prop.
      <AccountPhoto account={'zachzachzach'} />
      // overwrite `style` by passing to component.
    )
  }
}
```
View on NPM: [https://www.npmjs.com/package/accountphoto-react](https://www.npmjs.com/package/accountphoto-react)

## Custom Integration
If you need to build your own integration, it's easy as well. Simply utilize your existing eos session.

**ACCOUNT_NAME, the `lower_bound` param of `getTableRows`, needs the variable for the account name of the logged in user. Ie: 'zachzachzach'.**

```
eos.getTableRows({
    json: true,
    code: "accountphoto",
    scope: "accountphoto",
    table: "photo",
    lower_bound: ACCOUNT_NAME
}).then((res) => {
      let photo = res.rows[0]
      // you can save and/or display the photo, by reading "photo_hash"
      // ie: https://ipfs.io/ipfs/${photo.photo_hash}
    });
```
