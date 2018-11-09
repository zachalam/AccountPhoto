import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Eos from "eosjs"

import styles from './styles.css'

// eos config
const eos = Eos({
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // 32 byte (64 char) hex string
  httpEndpoint: 'https://publicapi-mainnet.eosauthority.com',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
})

export default class ExampleComponent extends Component {
  static propTypes = {
    account: PropTypes.string
  }

  state = { 
    photo: "QmRzP1etnyDY75Zhz6ddENAHWXoCz92eMUYZfgnRKTogr6" // default eos logo
  }

  constructor(props) {
    super(props)
    let { account } = props   // get account name.
    let encodedName = Eos.modules.format.encodeName(account,false).toString()
    console.log(encodedName)

    eos.getTableRows({
      json: true,
      code: "accountphoto",
      scope: "accountphoto",
      table: "photo",
      lower_bound: encodedName,
    })
      .then((res) => {
        let photo = res.rows[0]
        // load in hash from ipfs if correct account name was loaded
        if(photo.account_name === encodedName) {
          // photo found; save hash
          console.log(photo)
          this.setState({ photo: photo.photo_hash })
        }
      })

    

  }

  render() {

    let { style } = this.props
    if(!style) {
      // no style provided, add our own.
      style = { width: '60px', height: '60px', borderRadius: '50%'}
    }

    return (
        <a href="https://accountphoto.com" target="_blank">
          <img src={`https://ipfs.io/ipfs/${this.state.photo}`} style={style} />
        </a>      
    )
  }
}
