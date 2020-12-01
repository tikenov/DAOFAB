import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import axios from 'axios';

class Detailed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/transactions/" + this.props.location.state.id)
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { sender, receiver, total } = this.props.location.state;
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Total Amount</th>
                <th>Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{sender}</td>
                <td>{receiver}</td>
                <td>{total}</td>
                <td>{item.paidAmount}</td>
              </tr>)}
            </tbody>
          </Table>
          <Button onClick={() => this.props.history.goBack()} > Back</Button>
        </div>
      );
    }
  }

}


export default withRouter(Detailed);