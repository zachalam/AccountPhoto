![AccountPhoto Screenshot](https://raw.githubusercontent.com/zachalam/AccountPhoto/master/frontend/public/ap-screen.png)

## Developer Integration
If you run your own EOS dApp, you can provide a more personalized experience by integrating AccountPhoto into your service. It only takes a few lines of code.

**ACCOUNT_NAME, the 5th param of `getTableRows`, needs the account name of the logged in user. Ie: 'zachzachzach'.**

```
eos.getTableRows(true, 'accountphoto', 'accountphoto', 'photo', ACCOUNT_NAME)
   .then((res) => {
      let photo = res.rows[0]
      // you can save and/or display the photo, by reading "photo_hash"
      // ie: https://ipfs.io/ipfs/${photo.photo_hash}
    });
```