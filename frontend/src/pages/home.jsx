import React, { Component } from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import logo from '../assets/logo.png'
import scatter from '../services/scatter'
import ipfs from '../services/ipfs'
import Dropzone from 'react-dropzone'
import PhotoModal from './photo'
import eos_image from '../assets/eos.png'

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

  renderMain() {
    let { account } = this.state

    // scatter already linked
    if (account.name)
      return (
        <div>
          <Card.Header><h1>{account.name}</h1></Card.Header>
          This is how you currently appear on the EOS network.
          <div className={'spacer'} />
          <Button onClick={this.forgetScatter}>Unlink</Button>
          <PhotoModal account={account} />
        </div>
      )


    // need to link scatter
    return (
      <div>
        Personalize your EOS account by uploading a publicly visible photo.
        <div className={'spacer'} />
        <Button href="https://namevault.co" target="_blank">No Account?</Button>
        <Button onClick={this.linkScatter} color='blue'>Link Scatter</Button>
      </div>
    )

  }

  /* <Dropzone onDrop={this.onDrop}>hello</Dropzone> */
  render() {
    let { account } = this.state
    return (
      <div className={'center'}>
        <Card style={{ width: '100%', padding: '1.5em' }} color='grey'>
          <Image src={eos_image} />
          <Card.Content>  
            <Card.Description>
              {this.renderMain()}
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
