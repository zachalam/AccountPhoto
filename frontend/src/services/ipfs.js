const bufferFrom = require('buffer-from')
const ipfs = window.IpfsApi('ipfs.infura.io', '5001', { protocol: 'https' })
const fileReader = new FileReader();

export default (af, ipfsCall) => {
    fileReader.readAsArrayBuffer(af)
    fileReader.addEventListener("loadend", (e) => {
        var buffer = e.srcElement.result; //arraybuffer object
        ipfs.files.add(bufferFrom(buffer), (err, files) => {
            // return err, the first file, and all files.
            ipfsCall(err, files[0], files)
        })
    });
}