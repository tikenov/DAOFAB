import React from 'react';
import { Table, Pagination, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import queryString from 'query-string';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/api/transactions" + this.props.location.search)
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            total: result.data.totalPages,
            items: result.data.items
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
    const { error, isLoaded, items } = this.state;
    const params = queryString.parse(this.props.location.search);
    const size = params.size || 2;
    const total = this.state.total || 2;
    const active = params.page || 1;
    const paginations = [];

    for (let number = 1; number <= total; number++) {
      paginations.push(
        <Pagination.Item key={number} active={number == active} href={"?size=" + size + "&page=" + number}>
          {number}
        </Pagination.Item >
      );
    }

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
                <th>Total Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.sender}</td>
                <td>{item.receiver}</td>
                <td>{item.totalAmount}</td>
                <td><Link to={{
                  pathname: '/' + item.id,
                  state: {
                    sender: item.sender,
                    receiver: item.receiver,
                    total: item.totalAmount,
                    id: item.id
                  }
                }} className="link"> {item.totalPaidAmount}</Link></td>
              </tr>)}
            </tbody>
          </Table>
          <div className="row justify-content-start">
            <div className="col-2">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  Number of Rows
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/?size=2&page=1">2 - Default</Dropdown.Item>
                  <Dropdown.Item href="/?size=5&page=1">5</Dropdown.Item>
                  <Dropdown.Item href="/?size=10&page=1">10</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-2">
              <Pagination>{paginations}</Pagination>
            </div>
          </div>
        </div>
      );
    }
  }
}


export default withRouter(Main);