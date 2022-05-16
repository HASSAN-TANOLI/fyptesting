import React, { Fragment, useEffect, useState } from "react";
import { allVendors } from "../../actions/vendorActions";
import { allProducts } from "../../actions/productActions";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./pcBuildd.css";

const PcBuildd = ({}) => {
  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.allVendors);
  const { products } = useSelector((state) => state.allProducts);

  const [vendorProducts, setVendorProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState({});
  const [cpus, setCpus] = useState([]);
  const [gpus, setGpus] = useState([]);
  const [motherBoards, setMotherBoards] = useState([]);
  const [rams, setRams] = useState([]);
  const [storages, setStorages] = useState([]);
  const [powerSupplys, setPowerSupplys] = useState([]);
  const [cases, setCases] = useState([]);
  const [monitors, setMonitors] = useState([]);
  const [build, setBuild] = useState({});

  useEffect(() => {
    dispatch(allProducts());
  }, []);

  useEffect(() => {
    console.log("selected Vendor", selectedVendor);
    resetProducts();
    console.log(products);
    const _products = products.filter((p) => p?.userId === selectedVendor); // searching for products of selected vendor because userId is vendor id which is given to every product
    setVendorProducts([..._products]); // setting products of selected vendor
  }, [selectedVendor]);

  useEffect(() => {
    const _cpus = vendorProducts.filter(
      (p) => p.category.toLowerCase() === "cpu"
    );
    const _gpus = vendorProducts.filter(
      (p) => p.category.toLowerCase() === "graphiccards"
    );

    const _motherBoards = vendorProducts.filter(
      (p) => p.category.toLowerCase() === "motherboards"
    );

    const _rams = vendorProducts.filter(
      (p) => p.category.toLowerCase() === "ram"
    );

    const _storages = vendorProducts.filter(
      (p) => p.category.toLowerCase() === "harddisks"
    );

    const _powerSupplys = vendorProducts.filter(
      (p) => p.category.toLowerCase() === "powersupply"
    );

    const _cases = vendorProducts.filter(
      (p) => p.category.toLowerCase() === "case"
    );

    const _monitors = vendorProducts.filter(
      (p) => p.category.toLowerCase() === "monitor"
    );

    setCpus(_cpus);
    setGpus(_gpus);
    setMotherBoards(_motherBoards);
    setRams(_rams);
    setStorages(_storages);
    setPowerSupplys(_powerSupplys);
    setCases(_cases);
    setMonitors(_monitors);
  }, [vendorProducts]);

  const resetProducts = () => {
    setBuild({});
    setCpus([]);
    setVendorProducts([]);
    setGpus([]);
    setMotherBoards([]);
    setRams([]);
    setStorages([]);
    setPowerSupplys([]);
    setCases([]);
    setMonitors([]);
  };

  useEffect(() => {
    console.log("build changed", build);

    Object.keys(build).forEach((key) => {
      setTotal(total + build[key].price);
    });
  }, [build]);

  return (
    <Fragment>
      <div class="container">
        <label>Choose a Store: </label>

        <select
          className="combobox1"
          onChange={(e) => setSelectedVendor(e.target.value)}
        >
          <option value={null} selected>
            Select a store
          </option>
          {vendors.map((vendor) => {
            return (
              <option value={vendor._id} key={vendor._id}>
                {vendor.shopname}
              </option>
            );
          })}
        </select>

        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body text-center">
                <h5 class="card-title m-b-0">System Builder</h5>
              </div>
              <div class="table-responsive">
                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Component</th>
                      <th scope="col">Select</th>
                      <th scope="col">Selection</th>
                      <th scope="col"> Price </th>
                      <th scope="col">Reset</th>
                    </tr>
                  </thead>
                  <tbody class="customtable">
                    <tr>
                      <td>
                        <a> CPU </a>
                      </td>
                      <td>
                        <select
                          className="combobox"
                          onChange={(e) =>
                            setBuild({
                              ...build,
                              cpu: JSON.parse(e.target.value),
                            })
                          }
                        >
                          <option value={null} selected>
                            Select a CPU
                          </option>
                          {cpus.map((product) => {
                            return (
                              <option
                                key={product._id}
                                value={JSON.stringify(product)}
                              >
                                {product.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>{build?.cpu?.name}</td>
                      <td>{build?.cpu?.price}</td>
                      <td>
                        {" "}
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          onClick={() => setBuild({ ...build, cpu: "" })}
                        ></i>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>MOTHERBOARD</td>
                      <td>
                        <select
                          className="combobox"
                          onChange={(e) =>
                            setBuild({
                              ...build,
                              motherBoards: JSON.parse(e.target.value),
                            })
                          }
                        >
                          <option value={null} selected>
                            Select a Motherboard
                          </option>
                          {motherBoards.map((product) => {
                            return (
                              <option
                                key={product._id}
                                value={JSON.stringify(product)}
                              >
                                {product.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>{build?.motherBoards?.name}</td>
                      <td>{build?.motherBoards?.price}</td>
                      <td>
                        {" "}
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          onClick={() =>
                            setBuild({ ...build, motherBoards: "" })
                          }
                        ></i>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>RAM</td>

                      <td>
                        <select
                          className="combobox"
                          onChange={(e) =>
                            setBuild({
                              ...build,
                              rams: JSON.parse(e.target.value),
                            })
                          }
                        >
                          <option value={null} selected>
                            Select a Ram
                          </option>
                          {rams.map((product) => {
                            return (
                              <option
                                key={product._id}
                                value={JSON.stringify(product)}
                              >
                                {product.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>{build?.rams?.name}</td>
                      <td>{build?.rams?.price}</td>
                      <td>
                        {" "}
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          onClick={() =>
                            setBuild({ ...build, rams: "" })
                          }
                        ></i>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td> STORAGE </td>
                      <td>
                        <select
                          className="combobox"
                          onChange={(e) =>
                            setBuild({
                              ...build,
                              storages: JSON.parse(e.target.value),
                            })
                          }
                        >
                          <option value={null} selected>
                            Select a Storage
                          </option>
                          {storages.map((product) => {
                            return (
                              <option
                                key={product._id}
                                value={JSON.stringify(product)}
                              >
                                {product.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>{build?.storages?.name}</td>
                      <td>{build?.storages?.price}</td>
                      <td>
                        {" "}
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          onClick={() =>
                            setBuild({ ...build, storages: "" })
                          }
                        ></i>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td> GRAPHIC CARD </td>
                      <td>
                        {" "}
                        <select
                          className="combobox"
                          onChange={(e) =>
                            setBuild({
                              ...build,
                              graphiccards: JSON.parse(e.target.value),
                            })
                          }
                        >
                          <option value={null} selected>
                            Select a GPU
                          </option>
                          {gpus.map((product) => {
                            return (
                              <option
                                key={product._id}
                                value={JSON.stringify(product)}
                              >
                                {product.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>{build?.graphiccards?.name}</td>
                      <td>{build?.graphiccards?.price}</td>
                      <td>
                        {" "}
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          onClick={() =>
                            setBuild({ ...build, graphiccards: "" })
                          }
                        ></i>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>POWER SUPPLY</td>
                      <td>
                        <select
                          className="combobox"
                          onChange={(e) =>
                            setBuild({
                              ...build,
                              powerSupplys: JSON.parse(e.target.value),
                            })
                          }
                        >
                          <option value={null} selected>
                            Select a PowerSupply
                          </option>
                          {powerSupplys.map((product) => {
                            return (
                              <option
                                key={product._id}
                                value={JSON.stringify(product)}
                              >
                                {product.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>{build?.powerSupplys?.name}</td>
                      <td>{build?.powerSupplys?.price}</td>
                      <td>
                        {" "}
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          onClick={() =>
                            setBuild({ ...build, powerSupplys: "" })
                          }
                        ></i>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>CASE</td>
                      <td>
                        <select
                          className="combobox"
                          onChange={(e) =>
                            setBuild({
                              ...build,
                              cases: JSON.parse(e.target.value),
                            })
                          }
                        >
                          <option value={null} selected>
                            Select a Casing
                          </option>
                          {cases.map((product) => {
                            return (
                              <option
                                key={product._id}
                                value={JSON.stringify(product)}
                              >
                                {product.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>{build?.cases?.name}</td>
                      <td>{build?.cases?.price}</td>
                      <td>
                        {" "}
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          onClick={() =>
                            setBuild({ ...build, cases: "" })
                          }
                        ></i>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td> MONITOR </td>
                      <td>
                        <select
                          className="combobox"
                          onChange={(e) =>
                            setBuild({
                              ...build,
                              monitors: JSON.parse(e.target.value),
                            })
                          }
                        >
                          <option value={null} selected>
                            Select a Moniter
                          </option>
                          {monitors.map((product) => {
                            return (
                              <option
                                key={product._id}
                                value={JSON.stringify(product)}
                              >
                                {product.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>{build?.monitors?.name}</td>
                      <td>{build?.monitors?.price}</td>

                      <td>
                        {" "}
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          onClick={() =>
                            setBuild({ ...build, monitors: "" })
                          }
                        ></i>{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br></br>
              <br></br>
              <label class="totalAmount">Total Amount: {total}</label>
              <Link to="/soon">
                <button type="button" className="proceed">
                  Proceed
                </button>
              </Link>

              <br></br>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PcBuildd;
