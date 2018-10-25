import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react'
import ipfs from '../services/ipfs'
import Dropzone from 'react-dropzone'
import ReactLoading from 'react-loading';

// photo cropping tool...
import PhotoCropper from './photoCropper'

// Index component
class Photo extends Component {

  state = {
    modalOpen: false,
    isLoading: false,
    uploadedHash: '',    // ipfs hash
    src: '',  // uploaded photo src for cropping.
  }

  launchModal = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  resetUploadedHash = (e) => {
    if(e) e.preventDefault()    // prevent default event (if provided)
    this.setState({ uploadedHash: '' })
  }

  onDrop = (af, rf) => {
    this.setState({ isLoading: true, src: af[0] })
    af = af[0]

    /* TODO, add ipfs upload of cropped photo.
    ipfs(af, (err, file) => {
      console.log('file we got back');
      console.log(file)
      this.setState({
        uploadedHash: file.hash,
        isLoading: false
      })
    })*/
  }

  confirmPhoto = () => {
    let { account, authorization, contract } = this.props
    let { uploadedHash } = this.state // ipfs hash of photo..

    contract.set({
      account: account.name,
      photo_hash: uploadedHash
    },{authorization}).then((res) => {
      if(res.broadcast === true) {
        // successful broadcast
        console.log("good bcast")
        // reset hash, close modal, and show toast.
        this.resetUploadedHash();
        this.closeModal();
        this.props.setPhoto(uploadedHash);   // set photo from props.
      } else {
        // something went wrong.
        console.log("bad bcast")
      }
    })

  }

  whatToRender() {
    // show: (a) confirmation (b) dropzone / loader
    if (this.state.src) {
      // show (a) confirmation
      let { account } = this.props
      return (
        <div>
          <h2>Confirm Photo</h2>
          Please verify that you'd like the following photo linked to the account: <b>{account.name}</b>.
          <div className='spacer' />
          <PhotoCropper src={this.state.src} />
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
        <PhotoCropper />
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
