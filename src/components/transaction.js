import React, { Component } from "react";
import { connect } from "react-redux";
import * as actOrder from "../_actions/order";
import * as actOrderId from "../_actions/orderid";
import { Table } from "react-bootstrap";
import NumberFormat from "react-number-format";
import ModalTransaction from "./modals/modalOrder";

class Transaction extends Component {
  state = {
    modal: false,
  };
  showModal = (e) => {
      console.log(e.target.id)
    this.setState({ modal: true });
    this.props.dispatch(actOrderId.getOrderId(e.target.id));
  };
  hideModal = () => {
    this.setState({ modal: false });
  };

  componentDidMount() {
    this.props.dispatch(actOrder.getOrders());
  }

  render() {
    const { data: order, loading, error } = this.props.order;
    console.log(order);
    if (loading) return <h1>Loading</h1>;
    if (error) return <h1>ERROR</h1>;

    return (
      <div>
        <ModalTransaction show={this.state.modal} onHide={this.hideModal} />
        <h1>DATA PENJUALAN</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Customer</th>
              <th>Total Barang</th>
              <th>Total Harga</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order.length > 0 &&
              order.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.customer.nama}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <NumberFormat
                      value={item.total}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                    />
                  </td>
                  <td>
                    <button
                      className="button"
                      id={item.id}
                      onClick={this.showModal}
                    >
                      VIEW
                    </button>{" "}
                    <button style={{ marginLeft: 20 }} className="button">
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
  };
};

export default connect(mapStateToProps)(Transaction);
