import React, { Component } from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import logo from '../assets/logo.png'
import scatter from '../services/scatter'

// Index component
class Index extends Component {

  state = {
    account: {}
  }

  linkScatter = () => {
    scatter.connect((eos, account, transactionOptions) => {
      console.log("account is")
      console.log(account)
      this.setState({ account })
    });
  }

  forgetScatter = () => {
    this.setState({account:{}})
    scatter.forget()
  }

  componentWillUnmount() {
    this.forgetScatter()
  }

  render() {
    let { account } = this.state
    return (
      <div>


        <Card style={{width: '100%'}}>
          <Image src='/images/avatar/large/matthew.png' />
          <Card.Content>
            <Card.Header>{account.name}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              This is how you currently appear on the EOS network.
              <div className={'spacer'} />
              {account.name ? <Button onClick={this.forgetScatter}>Unlink Scatter</Button> : <Button onClick={this.linkScatter}>Link Scatter</Button>}
              
            </Card.Description>
          </Card.Content>

        </Card>

      </div>
    );
  }

}

export default Index;
