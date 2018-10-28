import eos_image from '../assets/eos.png'

export default (hash) => {
    // returns a url of a ipfs hash.
    if(hash) return `https://cloudflare-ipfs.com/ipfs/${hash}`
    return eos_image
}