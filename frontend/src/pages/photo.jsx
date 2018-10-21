import React, { Component } from 'react';
import { Modal, Image, Dimmer, Loader, Icon, Button, Segment } from 'semantic-ui-react'
import logo from '../assets/logo.png'
import scatter from '../services/scatter'
import ipfs from '../services/ipfs'
import Dropzone from 'react-dropzone'
import ReactLoading from 'react-loading';

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
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  resetUploadedHash = (e) => {
    e.preventDefault()
    this.setState({ uploadedHash: '' })
  }

  onDrop = (af, rf) => {
    this.setState({ isLoading: true })
    af = af[0]
    ipfs(af, (err, file) => {
      console.log('file we got back');
      console.log(file)
      this.setState({
        uploadedHash: file.hash,
        isLoading: false
      })
    })
  }

  confirmPhoto = () => {
    console.log("confirmed")
    let { eos, account, transactionOptions } = this.props
    let { uploadedHash } = this.state // ipfs hash of photo..
    console.log(eos)
    console.log(account)
  }

  whatToRender() {
    // show: (a) confirmation (b) dropzone / loader
    if (this.state.uploadedHash) {
      // show (a) confirmation
      let { account } = this.props
      return (
        <div>
          <h2>Confirm Photo</h2>
          Please verify that you'd like the following photo linked to the account: <b>{account.name}</b>.
                <div className='spacer' />
          <img src={`https://ipfs.io/ipfs/${this.state.uploadedHash}`} style={{ maxWidth: '100%' }} />
          <div className='spacer' />
          <Button color='green' onClick={this.confirmPhoto} fluid>Link This Photo</Button>
          <div className='center'>
            <a href="" onClick={this.resetUploadedHash}>I've changed my mind</a>
          </div>
        </div>
      )
    }

    // -----------------------

    // show (b) dropzone.
    return (
      <div>
        <h2>Upload Photo</h2>
        Choose a photo that you'd like to be linked to your account on the EOS blockchain.
            <div className='spacer' />

        {this.state.isLoading ?
          <div className='center'>
            <ReactLoading className={'center'} type={'cubes'} color={'#999999'} height={'150px'} width={'150px'} />
          </div>
          :
          <Dropzone onDrop={this.onDrop}
            style={{
              padding: '1em',
              textAlign: 'center',
              border: '3px dashed #ddd',
              height: '200px',
              cursor: 'pointer'
            }}>
            Drop your photo here, or tap to select.
            </Dropzone>}

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
