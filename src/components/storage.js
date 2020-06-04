import React, { Component } from "react";
import { connect } from "react-redux";
import * as actStock from "../_actions/storage";
import NumberFormat from "react-number-format";
import { Table } from "react-bootstrap";

class Storage extends Component {
  state = {
    modal: false,
  };

  componentDidMount() {
    this.props.dispatch(actStock.getStocks());
  }

  showModal = () => {
    this.setState({ modal: true });
  };
  hideModal = () => {
    this.setState({ modal: true });
  };

  render() {
    const { data: stocks, loading, error } = this.props.stock;
    console.log(stocks);
    if (loading) return <h1>Loading</h1>;
    if (error) return <h1>ERROR</h1>;

    return (
      <div>
        <h1>DATA STOCK BARANG</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Barang</th>
              <th>Jenis</th>
              <th>Harga</th>
              <th>Quantity</th>
              <th>Action</th>
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

                <td>
                  <button className="button" onClick={this.showModal}>
                    EDIT
                  </button>
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
    stock: state.stock,
  };
};

export default connect(mapStateToProps)(Storage);
