import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";



export default class header extends Component {
  render() {
    return (
      <div>
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link>
              <Link to="/">Data Customer</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/stock">Data Barang</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/transaction">Data Penjualan</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/sell">Buat Transaksi</Link>
            </Nav.Link>
          </Nav.Item>
          
        </Nav>
      </div>
    );
  }
}
