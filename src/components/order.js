import React, { Component } from "react";
import { connect } from "react-redux";
import * as actStock from "../_actions/storage";
import * as actCategory from "../_actions/category";
import * as actUser from "../_actions/customer";
import NumberFormat from "react-number-format";
import { Table, Button, Modal, Form, Alert, Row, Col } from "react-bootstrap";
import { RiAddCircleLine } from "react-icons/ri";
import { API } from "../config/api";
import { Redirect } from "react-router-dom";

class Order extends Component {
  state = {
    modalAddItem: false,
    customerId: "",
    quantity: "",
    id: "",
    products: [],
    success: false,
  };

  componentDidMount() {
    this.props.dispatch(actStock.getStocks());
    this.props.dispatch(actCategory.getCategories());
    this.props.dispatch(actUser.getUsers());
  }

  handleChangeTxt = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showAdd = () => {
    this.setState({ modalAddItem: true });
  };

  hideAdd = () => {
    this.setState({ modalAddItem: false });
  };

  addItem = async () => {
    const getData = await API.get(`/product/${this.state.id}`);
    if (this.state.quantity > getData.data.quantity) {
      alert(
        `Jumlah barang melebihi stock, stock barang tersedia adalah ${getData.data.quantity}`
      );
      this.setState({ quantity: "" });
    }
    const data = {
      id: this.state.id,
      quantity: this.state.quantity,
    };
    if (!data) {
      console.log("failed to make data");
    }
    this.state.products.push(data);

    this.setState({ modalAddItem: false });
  };

  handleSubmit = async () => {
    if(!this.state.customerId){
        alert("Input Customer")
    }  
    const data = {
      customerId: this.state.customerId,
      products: this.state.products,
    };
    console.log(data);
    const sendData = await API.post(`/transaction`, {
      customerId: this.state.customerId,
      products: this.state.products,
    });
    if (sendData) {
      this.setState({ success: true });
    }
  };

  render() {
    const { data: stocks, loading, error } = this.props.stock;
    const { data: categories } = this.props.category;
    const { data: customer } = this.props.customer;
    const produk = this.state.products;
    if (this.state.success) return <Redirect to="/transaction" />;

    return (
      <div>
        <div
          style={{
            margin: "auto",
            marginTop: "30px",
            width: "80%",
          }}
        >
          <Row>
            <Col>
              <Button
                variant="primary"
                style={{ marginBottom: 20, marginLeft: 20 }}
                onClick={this.showAdd}
              >
                <RiAddCircleLine /> Tambah Item
              </Button>
            </Col>
          </Row>
          <Form>
            <Form.Group>
              <Form.Label className="bold">Customer</Form.Label>
              <select
                onChange={this.handleChangeTxt}
                defaultValue={"select"}
                name="customerId"
                id="customerId"
                className="form-control"
              >
                <option value="select" disabled>
                  Pilih Customer
                </option>
                {customer &&
                  customer.length > 0 &&
                  customer.map((item) => (
                    <option value={item.id}>{item.nama}</option>
                  ))}
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label className="bold">Barang</Form.Label>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode Barang</th>
                    <th>Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {produk &&
                    produk.length > 0 &&
                    produk.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <th>{item.id}</th>
                        <th>{item.quantity}</th>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Form.Group>
            <Row>
              <Col xs={10}></Col>
              <Col>
                <Button variant="success" onClick={this.handleSubmit}>
                  Buy
                </Button>
              </Col>
            </Row>
          </Form>
          {/* Modal ADD ITEM */}
          <Modal
            show={this.state.modalAddItem}
            onHide={this.hideAdd}
            size="xs"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Form>
              <Form.Group>
                <Form.Label className="bold">Tambah Barang</Form.Label>
                <select
                  onChange={this.handleChangeTxt}
                  defaultValue={"select"}
                  name="id"
                  id="id"
                  className="form-control"
                >
                  <option value="select" disabled>
                    Pilih Item
                  </option>
                  {stocks &&
                    stocks.length > 0 &&
                    stocks.map((item) => (
                      <option value={item.id}>{item.namaProduk}</option>
                    ))}
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="bold">Jumlah</Form.Label>
                <Form.Control
                  name="quantity"
                  type="text"
                  placeholder="Masukan Jumlah Barang"
                  onChange={this.handleChangeTxt}
                  value={this.state.quantity}
                />
              </Form.Group>
            </Form>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideAdd}>
                NO
              </Button>
              <Button variant="primary" onClick={this.addItem}>
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
    stock: state.stock,
    category: state.category,
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(Order);
