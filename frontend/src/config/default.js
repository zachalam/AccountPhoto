let network = {
    "blockchain": "eos",
    "protocol": "https",
    "host": "nodes.get-scatter.com",
    "port": 443,
    "chainId": "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
}

let ipfs = {
    "host": "ipfs.infura.io",
    "port": 5001,
}

// use the dev endpoint (and vars) if "localhost" appears in hostname
if (window.location.hostname === "localhost") {
    network = {
        "blockchain": "eos",
        "protocol": "https",
        "host": "kylin.eoscanada.com",
        "port": 443,
        "chainId": "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
    }
}

module.exports = {
    network,
    ipfs
}