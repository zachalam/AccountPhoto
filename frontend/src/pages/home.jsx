import React, { Component } from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import scatter from '../services/scatter'
import ipfs from '../services/ipfs'
import ipfsUrl from '../services/ipfsUrl'
import PhotoModal from './photoModal'
import config from "../config/default";

console.log(ipfs)

// Index component
class Index extends Component {

  state = {
    account: {},
    eos: '',
    authorization: '',
    contract: '',
    photo: ipfsUrl(),
  }

  constructor(props) {
    super(props);
    this.setPhoto = this.setPhoto.bind(this)
  }

  linkScatter = () => {
    scatter.connect((eos, account, authorization) => {
      // save scatter helpers
      this.setState({ eos, account, authorization })
      // also get/save contract.
      eos.contract(config.network.contract)
      .then((contract) => { 
        this.setState({contract},() => {
          this.setPhoto()
        }) 
        
      });
    });
  }

  forgetScatter = () => {
    this.setState({ account: {}, eos: '', authorization: '', contract: '', photo: ipfsUrl() })
    scatter.forget()
  }

  componentWillUnmount() {
    this.forgetScatter()
  }

  setPhoto = (hash) => {
    // get photo from ipfs
    let { eos, account } = this.state
    let { network } = config

    if(hash) {
      // hash provided just use that one.
      this.setState({photo: ipfsUrl(hash)})
    } else {
      // check eos network for profile hash.
      eos.getTableRows(true, network.contract, network.contract, 'photo', account.name)
          .then((res) => {
            let photo = res.rows[0]
            console.log(photo)
            // load in hash from ipfs
            this.setState({photo: ipfsUrl(photo.photo_hash)})
          });
    }

  }

  renderMain() {
    let { account, eos, authorization, contract } = this.state

    // scatter already linked
    if (contract)
      return (
        <div>
          <Card.Header><h1>{account.name}</h1></Card.Header>
          This is how you currently appear on the EOS network.
          <div className={'spacer'} />
          <Button onClick={this.forgetScatter}>Unlink</Button>
          <PhotoModal 
            account={account} 
            eos={eos} 
            authorization={authorization} 
            contract={contract}
            setPhoto={this.setPhoto}
          />
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
    let { photo } = this.state
    return (
      <div className={'center'}>
        <Card style={{ width: '100%', padding: '1.5em' }} color='grey'>
          <Image src={photo} />
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
