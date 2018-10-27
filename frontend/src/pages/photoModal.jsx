import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react'
import ipfs from '../services/ipfs'
import ipfsUrl from '../services/ipfsUrl'
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

  constructor(props) {
    super(props)
    this.finalizePhoto = this.finalizePhoto.bind(this)
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

  finalizePhoto = (af) => {
    this.setState({ isLoading: true })

    ipfs(af, (err, file) => {
      console.log('file we got back');
      console.log(file)
      this.setState({
        uploadedHash: file.hash,
        isLoading: false
      },() => {
        // confirm on contract
        this.confirmPhoto()
      })
    })
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
        alert("Unable to contact the EOS network, please try again later.")
      }
    })

  }

  whatToRender = () => {
    let { isLoading, uploadedHash } = this.state
    let { account } = this.props
    // render one of the following:
    // loading bar
    // confirmation screen (for scatter)
    // image uploader/cropper
    if(isLoading) return (<div>storing on ipfs..</div>)

    if(uploadedHash) return (<div><h3>Confirm with Scatter</h3>
    We've opened scatter for you, please confirm your new photo.
    <br /><br />
    <Button onClick={this.confirmPhoto} color='blue'>Re-Launch Scatter</Button>
    </div>)

    return (<PhotoCropper finalizePhoto={this.finalizePhoto} account={account} />)
  }

  render() {
    return (
      <span>
        <Modal size={'mini'} open={this.state.modalOpen} onClose={this.closeModal}>
          <Modal.Content>
            <div>
              {this.whatToRender()}
              <div className='spacer' />
            </div>
          </Modal.Content>
        </Modal>
        <Button onClick={this.launchModal} color='green'>Change Photo</Button>
      </span>
    );
  }

}

export default Photo;
