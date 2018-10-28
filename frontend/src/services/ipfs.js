import config from "../config/default";
const bufferFrom = require('buffer-from')

const ipfs = window.IpfsApi(config.ipfs.host, config.ipfs.port, { protocol: 'https' })
//const ipfs = window.IpfsApi("ipfs.jes.xxx", 5001, { protocol: 'https' })
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