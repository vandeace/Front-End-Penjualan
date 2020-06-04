import React, { Component } from "react";
import { connect } from "react-redux";
import * as actUser from "../_actions/customer";
import { Table, Button, Modal, Form } from "react-bootstrap";
// import ModalAdd from "./modals/addCustomer";
import { RiAddCircleLine } from "react-icons/ri";
import { API } from "../config/api";

class Cust extends Component {
  state = {
    addModal: false,
    editModal: false,
    nama: "",
    gender: "",
    phone: "",
    alamat: "",
    id: "",
  };

  componentDidMount() {
    this.props.dispatch(actUser.getUsers());
  }

  handleChangeTxt = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  addData = async () => {
    try {
      const newData = await API.post("/customer", {
        nama: this.state.nama,
        gender: this.state.gender,
        phone: this.state.phone,
        alamat: this.state.alamat,
      });
      if (newData) {
        this.props.dispatch(actUser.getUsers());
      }
      this.setState({ addModal: false });
    } catch (error) {
      console.log(error);
    }
  };
  editData = async () => {
    try {
      const idCust = this.state.id;
      console.log(idCust);
      const updatedData = await API.patch(`/customer/${idCust}`, {
        nama: this.state.nama,
        gender: this.state.gender,
        phone: this.state.phone,
        alamat: this.state.alamat,
      });
      if (updatedData) {
        this.props.dispatch(actUser.getUsers());
      }
      this.setState({ editModal: false });
    } catch (error) {
      console.log(error);
    }
  };

  showAdd = () => {
    this.setState({ addModal: true });
  };
  hideAdd = () => {
    this.setState({ addModal: false });
  };

  showEdit = (e) => {
    this.setState({ id: e.target.id });
    this.setState({ editModal: true });
  };
  hideEdit = () => {
    this.setState({ editModal: false });
  };

  render() {
    const { data: customer, loading, error } = this.props.customer;

    if (loading) return <h1>Loading</h1>;
    if (error) return <h1>ERROR</h1>;

    return (
      <div>
        <h1>DATA CUSTOMER</h1>
        <Button
          variant="secondary"
          style={{ marginBottom: 20, marginLeft: 20 }}
          onClick={this.showAdd}
        >
          <RiAddCircleLine /> Tambah Data Customer
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Gender</th>
              <th>No HP</th>
              <th>Alamat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customer.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.nama}</td>
                <td>{item.gender}</td>
                <td>{item.phone}</td>
                <td>{item.alamat}</td>
                <td>
                  <button
                    className="button"
                    id={item.id}
                    onClick={this.showEdit}
                  >
                    EDIT
                  </button>{" "}
                  <button style={{ marginLeft: 20 }} className="button">
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal
          show={this.state.editModal}
          onHide={this.hideEdit}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Tambah Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label className="bold">Nama</Form.Label>
                <Form.Control
                  name="nama"
                  type="text"
                  placeholder="Masukan Nama Customer"
                  onChange={this.handleChangeTxt}
                  value={this.state.nama}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="bold">Gender</Form.Label>
                <select
                  onChange={this.handleChangeTxt}
                  defaultValue={"select"}
                  name="gender"
                  id="gender"
                  className="form-control"
                >
                  <option value="select" disabled>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="bold">No Telepon</Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  placeholder="Masukan No Telepon"
                  onChange={this.handleChangeTxt}
                  value={this.state.phone}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="bold">Alamat</Form.Label>
                <Form.Control
                  name="alamat"
                  type="text"
                  placeholder="Masukan Alamat Customer"
                  onChange={this.handleChangeTxt}
                  value={this.state.alamat}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={this.editData}>
              Edit Data
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.addModal}
          onHide={this.hideAdd}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Tambah Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label className="bold">Nama</Form.Label>
                <Form.Control
                  name="nama"
                  type="text"
                  placeholder="Masukan Nama Customer"
                  onChange={this.handleChangeTxt}
                  value={this.state.nama}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="bold">Gender</Form.Label>
                <select
                  onChange={this.handleChangeTxt}
                  defaultValue={"select"}
                  name="gender"
                  id="gender"
                  className="form-control"
                >
                  <option value="select" disabled>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="bold">No Telepon</Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  placeholder="Masukan No Telepon"
                  onChange={this.handleChangeTxt}
                  value={this.state.phone}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="bold">Alamat</Form.Label>
                <Form.Control
                  name="alamat"
                  type="text"
                  placeholder="Masukan Alamat Customer"
                  onChange={this.handleChangeTxt}
                  value={this.state.alamat}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(Cust);
