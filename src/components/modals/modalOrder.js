import React, { Component } from "react";
import { Modal, Button, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

class modalOrder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data: order, loading, error } = this.props.order;
    if (loading) return <h1>Loading</h1>;
    if (error) return <h1>ERROR</h1>;

    const produk = order.products;

    console.log(produk);
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Detail Transaksi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={3}>
                <h6>Detail Barang</h6>
              </Col>
            </Row>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Barang</th>
                    <th>Harga</th>
                    <th>Jenis</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {produk &&
                    produk.length > 0 &&
                    produk.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.namaProduk}</td>
                        <td>
                          <NumberFormat
                            value={item.harga}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp. "}
                          />
                        </td>
                        <td>{item.category.jenisProduk}</td>
                        <td>{item.productorders.quantity}</td>
                        <td>
                          {" "}
                          <NumberFormat
                            value={item.productorders.total}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp. "}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Row>
            <Row>
              <Col xs={6}></Col>
              <Col xs={3}>
                <h6>Jumlah Item</h6>
              </Col>
              <Col>
                <h6>{order.quantity}</h6>
              </Col>
            </Row>
            <Row>
              <Col xs={6}></Col>
              <Col xs={3}>
                <h6>Total Harga</h6>
              </Col>
              <Col>
                <h6>
                  <NumberFormat
                    value={order.total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp. "}
                  />
                </h6>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.orderId,
  };
};

export default connect(mapStateToProps)(modalOrder);
