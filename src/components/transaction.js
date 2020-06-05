import React, { Component } from "react";
import { connect } from "react-redux";
import * as actOrder from "../_actions/order";
import * as actOrderId from "../_actions/orderid";
import { Table, Modal, Button } from "react-bootstrap";
import NumberFormat from "react-number-format";
import ModalTransaction from "./modals/modalOrder";
import { API } from "../config/api";

class Transaction extends Component {
  state = {
    modal: false,
    deleteModal: false,
    id: "",
  };

  componentDidMount() {
    this.props.dispatch(actOrder.getOrders());
  }

  showModal = (e) => {
    console.log(e.target.id);
    this.setState({ modal: true });
    this.props.dispatch(actOrderId.getOrderId(e.target.id));
  };

  hideModal = () => {
    this.setState({ modal: false });
  };

  showDel = (e) => {
    this.setState({ id: e.target.id });
    this.setState({ deleteModal: true });
  };

  hideDel = () => {
    this.setState({ deleteModal: false });
  };

  delData = async () => {
    try {
      const delData = await API.delete(`/transaction/${this.state.id}`);
      if (delData) {
        this.props.dispatch(actOrder.getOrders());
      }
      this.setState({ deleteModal: false });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { data: order, loading, error } = this.props.order;
    console.log(order);
    if (loading) return <h1>Loading</h1>;
    if (error) return <h1>ERROR</h1>;

    return (
      <div>
        <ModalTransaction show={this.state.modal} onHide={this.hideModal} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <h1> DATA TRANSAKSI </h1>
        </div>

        <div
          style={{
            margin: "auto",
            marginTop: "30px",
            width: "80%",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Customer</th>
                <th>Total Barang</th>
                <th>Total Harga</th>
                <th
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Action
                </th>
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
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="info"
                        id={item.id}
                        onClick={this.showModal}
                      >
                        VIEW
                      </Button>{" "}
                      <Button
                        style={{ marginLeft: 20 }}
                        id={item.id}
                        onClick={this.showDel}
                        variant="danger"
                      >
                        DELETE
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <Modal
            show={this.state.deleteModal}
            onHide={this.hideDel}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                APAKAH KAMU YAKIN MENGHAPUS DATA TRANSAKSI INI?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideDel}>
                NO
              </Button>
              <Button variant="primary" onClick={this.delData}>
                YES
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
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
