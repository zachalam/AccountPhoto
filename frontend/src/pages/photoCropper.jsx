import React, { Component } from 'react';
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import Dropzone from 'react-dropzone'

import "react-image-crop/dist/ReactCrop.css";


class PhotoCropper extends Component {
  state = {
    src: this.props.src,
    crop: {
      x: 10,
      y: 10,
      aspect: 1,
      width: 20,
      height: 20
    }
  };

  onSelectFile = e => {
    e = e[0] // grab + save first image..    
    this.setState({src: e.preview})
  };

  onImageLoaded = async (image, pixelCrop) => {
    this.setState({ image });
    if (pixelCrop) {
      const finalImage = await this.getCroppedImg(
        image,
        pixelCrop,
        "newFile.jpeg"
      );
      this.setState({ finalImage });
    }
  };

  onCropComplete = async (crop, pixelCrop) => {
    const finalImage = await this.getCroppedImg(
      this.state.image,
      pixelCrop,
      "newFile.jpeg"
    );
    this.setState({ finalImage });
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        file.name = fileName;
        resolve(file);
      }, "image/jpeg");
    });
  }

  render() {
    return (
      <div>
        <div>
          {!this.state.src ? <Dropzone 
            onDrop={this.onSelectFile}
            accept="image/jpeg, image/jpg, image/png"
            style={{
              padding: '1em',
              textAlign: 'center',
              border: '3px dashed #ddd',
              height: '200px',
              cursor: 'pointer'
            }}>
            Drop your photo here, or tap to select.
          </Dropzone> : null}
        </div>
        {this.state.src && (
          <ReactCrop
            src={this.state.src}
            crop={this.state.crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
      </div>
    );
  }
}

export default PhotoCropper;

