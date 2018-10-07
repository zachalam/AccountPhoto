import React, { Component } from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import logo from '../assets/logo.png'
import scatter from '../services/scatter'
import ipfs from '../services/ipfs'
import Dropzone from 'react-dropzone'



console.log(ipfs)

// Index component
class Index extends Component {

  state = {
    account: {}
  }

  constructor(props) {
    super(props);
    console.log("yolo")
  }

  onDrop = (af,rf) => {
    af = af[0]
    ipfs(af,(err,files) => {
      console.log('file we got back');
      console.log(files)
    })
  }

  linkScatter = () => {
    scatter.connect((eos, account, transactionOptions) => {
      console.log("account is")
      console.log(account)
      this.setState({ account })
    });
  }

  forgetScatter = () => {
    this.setState({ account: {} })
    scatter.forget()
  }

  componentWillUnmount() {
    this.forgetScatter()
  }

  renderScatterButtons() {
    let { account } = this.state

    // scatter already linked
    if (account.name)
      return (
        <div>
          <Button onClick={this.forgetScatter}>Unlink</Button>
          <Button onClick={this.forgetScatter}>Change Photo</Button>
        </div>
      )


    // need to link scatter
    return (
      <div>
        <Button onClick={this.forgetScatter}>No Account?</Button>
        <Button onClick={this.linkScatter} color='blue'>Link Scatter</Button>
      </div>
    )

  }

  render() {
    let { account } = this.state
    return (
      <div className={'center'}>
        <Card style={{ width: '100%', padding: '1.5em' }} color='blue'>
          <Image src='https://cdn-images-1.medium.com/max/900/1*zkkZqd1_ShN9rRqBG_Wu3A@2x.png' />
          <Card.Content>
            <Card.Header><h1>{account.name}</h1></Card.Header>
            <Card.Description>

              <Dropzone onDrop={this.onDrop}>hello</Dropzone>
              This is how you currently appear on the EOS network.
              <div className={'spacer'} />
              {this.renderScatterButtons()}

            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              Developer? Integrate <b>accountphoto</b>.
            </a>
          </Card.Content>

        </Card>

      </div>
    );
  }

}

export default Index;
