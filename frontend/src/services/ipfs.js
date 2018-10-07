const ipfsAPI = require('ipfs-api')
const bufferFrom = require('buffer-from')
const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })
const fileReader = new FileReader();

export default (af, ipfsCall) => {
    fileReader.readAsArrayBuffer(af)
    fileReader.addEventListener("loadend", (e) => {
        var buffer = e.srcElement.result; //arraybuffer object
        ipfs.files.add(bufferFrom(buffer), (err, files) => {
            // 'files' will be an array of objects containing paths and the multihashes of the files added
            ipfsCall(err, files)
        })
    });
}