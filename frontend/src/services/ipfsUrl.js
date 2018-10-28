import eos_image from '../assets/eos.png'

export default (hash) => {
    // returns a url of a ipfs hash.
    if(hash) return `https://ipfs.io/ipfs/${hash}`
    return eos_image
}