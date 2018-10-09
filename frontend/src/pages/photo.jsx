import React, { Component } from 'react';
import { Modal, Image, Dimmer, Loader, Icon, Button } from 'semantic-ui-react'
import logo from '../assets/logo.png'
import scatter from '../services/scatter'
import ipfs from '../services/ipfs'
import Dropzone from 'react-dropzone'

// Index component
class Photo extends Component {

  state = {
    modalOpen: false,
    isLoading: false,
    uploadedHash: ''    // ipfs hash
  }

  constructor(props) {
    super(props);
  }

  launchModal = () => {
    this.setState({modalOpen:true})
  }

  closeModal = () => {
      this.setState({modalOpen:false})
  }

  onDrop = (af,rf) => {
    this.setState({isLoading:true})
    af = af[0]
    ipfs(af,(err,file) => {
      console.log('file we got back');
      console.log(file)
      this.setState({uploadedHash:file.hash, 
        isLoading:false})
    })
  }


  whatToRender() {
    // show: a) dropzone b) loader c) payment

    if(this.state.isLoading) {
        // show loading bar
        return (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )
    }

    if(this.state.uploadedHash) {
        // show payment options.
        let { account} = this.props
        return (
            <div>
                <h2>Confirm Photo</h2>
                Link photo to your account, <b>{account.name}</b>, on the EOS blockchain.
                <div className='spacer' />
                <img src={`https://ipfs.io/ipfs/${this.state.uploadedHash}`} style={{maxWidth:'100%'}}/>
                <div className='spacer' />
                <Button color='green' fluid>Link This Photo</Button>
            </div>
        )
    }

    // show dropzone.
    return (
        <div>
            <h2>Upload Photo</h2>
            <Dropzone onDrop={this.onDrop}
            style={{
                padding:'1em',
                textAlign:'center',
                border:'3px dashed #ddd',
                height:'200px',
                cursor:'pointer'
            }}>
                Drop your photo here, or tap to select.
            </Dropzone>
        </div>
    )


  }

  render() {
    return (
      <span>
        <Modal size={'mini'} open={this.state.modalOpen} onClose={this.closeModal}>
          <Modal.Content>
              {this.whatToRender()}
          </Modal.Content>
        </Modal>
        <Button onClick={this.launchModal} color='green'>Change Photo</Button>
      </span>
    );
  }

}

export default Photo;
