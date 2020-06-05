import React, { Component } from "react";
import { connect } from "react-redux";
import * as actStock from "../_actions/storage";
import * as actCategory from "../_actions/category";
import NumberFormat from "react-number-format";
import { Table, Button, Modal, Form, Alert, Row } from "react-bootstrap";
import { RiAddCircleLine } from "react-icons/ri";
import { API } from "../config/api";

class Storage extends Component {
  state = {
    addModal: false,
    editModal: false,
    deleteModal: false,
    cateModal: false,
    namaProduk: "",
    categoryId: "",
    jenisProduk: "",
    harga: "",
    quantity: "",
    id: "",
    kategori: [],
    alert: false,
  };

  componentDidMount() {
    this.props.dispatch(actStock.getStocks());
    this.props.dispatch(actCategory.getCategories());
  }

  handleChangeTxt = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //ALL MODAL TRIGGER
  showAdd = () => {
    this.setState({ addModal: true });
  };
  hideAdd = () => {
    this.setState({ addModal: false });
  };
  showEdit = async (e) => {
    this.setState({ id: e.target.id });
    this.setState({ editModal: true });
    const getData = await API.get(`/product/${e.target.id}`);
    console.log(getData);
    this.setState({ namaProduk: getData.data.namaProduk });
    this.setState({ categoryId: getData.data.categoryId });
    this.setState({ harga: getData.data.harga });
    this.setState({ quantity: getData.data.quantity });
  };
  hideEdit = () => {
    this.setState({ editModal: false });
  };
  showDel = (e) => {
    this.setState({ id: e.target.id });
    this.setState({ deleteModal: true });
  };
  hideDel = () => {
    this.setState({ deleteModal: false });
  };
  showCat = () => {
    this.setState({ cateModal: true });
  };
  hideCat = () => {
    this.setState({ cateModal: false });
  };
  //FUNCTION CRUD
  //ADD PRODUCT
  addData = async () => {
    try {
      const newData = await API.post("/product", {
        namaProduk: this.state.namaProduk,
        categoryId: this.state.categoryId,
        harga: this.state.harga,
        quantity: this.state.quantity,
      });
      if (newData) {
        this.props.dispatch(actStock.getStocks());
      }
      this.setState({ addModal: false });
    } catch (error) {
      console.log(error);
    }
  };
  //EDIT PRODUCT
  editData = async () => {
    try {
      const id = this.state.id;
      const updateData = await API.patch(`/product/${id}`, {
        namaProduk: this.state.namaProduk,
        categoryId: this.state.categoryId,
        harga: this.state.harga,
        quantity: this.state.quantity,
      });
      if (updateData) {
        this.props.dispatch(actStock.getStocks());
      }
      this.setState({ editModal: false });
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE PRODUCT

  delData = async () => {
    try {
      const id = this.state.id;
      const delData = await API.delete(`/product/${id}`);
      if (delData) {
        this.props.dispatch(actStock.getStocks());
      }
      this.setState({ deleteModal: false });
    } catch (error) {
      console.log(error);
    }
  };

  //ADD CATEGORY

  addCategory = async () => {
    try {
      const addData = await API.post(`/category`, {
        jenisProduk: this.state.jenisProduk,
      });
      if (addData) {
        this.props.dispatch(actCategory.getCategories());
        alert("success add new category");
      }

      this.setState({ cateModal: false });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { data: stocks, loading, error } = this.props.stock;
    const { data: categories } = this.props.category;

    if (loading) return <h1>Loading</h1>;
    if (error) return <h1>ERROR</h1>;
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <h1> STOCK BARANG </h1>
        </div>
        <div
          style={{
            margin: "auto",
            marginTop: "30px",
            width: "80%",
          }}
        >
          <Button
            variant="primary"
            style={{ marginBottom: 20, marginLeft: 20 }}
            onClick={this.showAdd}
          >
            <RiAddCircleLine /> Tambah Data Produk
          </Button>

          <Button
            variant="primary"
            style={{ marginBottom: 20, marginLeft: 20 }}
            onClick={this.showCat}
          >
            <RiAddCircleLine /> Tambah Data Category
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Barang</th>
                <th>Jenis</th>
                <th>Harga</th>
                <th>Quantity</th>
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
              {stocks.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.namaProduk}</td>
                  <td>{item.category.jenisProduk}</td>
                  <td>
                    <NumberFormat
                      value={item.harga}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                    />
                  </td>
                  <td>{item.quantity}</td>

                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="success"
                      id={item.id}
                      onClick={this.showEdit}
                    >
                      EDIT
                    </Button>
                    <Button
                      style={{ marginLeft: 20 }}
                      variant="danger"
                      id={item.id}
                      onClick={this.showDel}
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* ADD PRODUCT MODAL */}
          <Modal
            show={this.state.addModal}
            onHide={this.hideAdd}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Tambah Produk</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label className="bold">Nama Produk</Form.Label>
                  <Form.Control
                    name="namaProduk"
                    type="text"
                    placeholder="Masukan Nama Produk"
                    onChange={this.handleChangeTxt}
                    value={this.state.namaProduk}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="bold">Jenis Produk</Form.Label>
                  <select
                    onChange={this.handleChangeTxt}
                    defaultValue={"select"}
                    name="categoryId"
                    id="categoryId"
                    className="form-control"
                  >
                    <option value="select" disabled>
                      Pilih Jenis Produk
                    </option>
                    {categories &&
                      categories.length > 0 &&
                      categories.map((item) => (
                        <option value={item.id}>{item.jenisProduk}</option>
                      ))}
                  </select>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="bold">Quantity</Form.Label>
                  <Form.Control
                    name="quantity"
                    type="text"
                    placeholder="Masukan Jumlah Produk"
                    onChange={this.handleChangeTxt}
                    value={this.state.quantity}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="bold">Harga</Form.Label>
                  <Form.Control
                    name="harga"
                    type="text"
                    placeholder="Masukan Harga Produk"
                    onChange={this.handleChangeTxt}
                    value={this.state.harga}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideAdd}>
                Close
              </Button>
              <Button variant="primary" onClick={this.addData}>
                Tambah Data
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Modal Edit PRODUCT */}
          <Modal
            show={this.state.editModal}
            onHide={this.hideEdit}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Tambah Produk</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label className="bold">Nama Produk</Form.Label>
                    <Form.Control
                      name="namaProduk"
                      type="text"
                      placeholder="Masukan Nama Produk"
                      onChange={this.handleChangeTxt}
                      value={this.state.namaProduk}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="bold">Jenis Produk</Form.Label>
                    <select
                      onChange={this.handleChangeTxt}
                      defaultValue={"select"}
                      name="categoryId"
                      id="categoryId"
                      className="form-control"
                    >
                      <option value="select" disabled>
                        Pilih Jenis Produk
                      </option>
                      {categories &&
                        categories.length > 0 &&
                        categories.map((item) => (
                          <option value={item.id}>{item.jenisProduk}</option>
                        ))}
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="bold">Quantity</Form.Label>
                    <Form.Control
                      name="quantity"
                      type="text"
                      placeholder="Masukan Jumlah Produk"
                      onChange={this.handleChangeTxt}
                      value={this.state.quantity}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="bold">Harga</Form.Label>
                    <Form.Control
                      name="harga"
                      type="text"
                      placeholder="Masukan Harga Produk"
                      onChange={this.handleChangeTxt}
                      value={this.state.harga}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.hideEdit}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.editData}>
                  Edit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          {/* MODAL DELETE PRODUCT */}
          <Modal
            show={this.state.deleteModal}
            onHide={this.hideDel}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                APAKAH KAMU YAKIN MENGHAPUS PRODUCT INI?
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
          {/* MODAL ADD CATEGORY */}
          <Modal
            show={this.state.cateModal}
            onHide={this.hideCat}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>TAMBAH KATEGORI BARU</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label className="bold">Nama Kategori</Form.Label>
                  <Form.Control
                    name="jenisProduk"
                    type="text"
                    placeholder="Input New Category"
                    onChange={this.handleChangeTxt}
                    value={this.state.jenisProduk}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideCat}>
                NO
              </Button>
              <Button variant="primary" onClick={this.addCategory}>
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
  };
};

export default connect(mapStateToProps)(Storage);
