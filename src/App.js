import "./App.css";
import Navbar from "./components/Navbar";

import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";

import verifier from "./contracts/verifier.abi.json";
import IERC from "./contracts/ierc.abi.json";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";

const ERC20_DECIMALS = 18;

const contractAddress = "0xA2a29121E518186088d51f8F36494de48ACCC9Fb";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [products, setProducts] = useState([]);

  const celoConnect = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
        console.log(user_address);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error");
    }
  };

  const getBalance = useCallback(async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(verifier, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);
  const getProducts = async () => {
    try {
      const productLength = await contract.methods.getProductLength().call();
      const _products = [];

      for (let index = 0; index < productLength; index++) {
        let _product = new Promise(async (resolve, reject) => {
          let product = await contract.methods.getProducts(index).call();
          resolve({
            index: index,
            owner: product[0],
            name: product[1],
            summary: product[2],
            image: product[3],
            good: product[4],
            bad: product[5],
          });
        });
        _products.push(_product);
      }
      const products = await Promise.all(_products);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  const upvoteProduct = async (_index) => {
    const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
    try {
      const price = new BigNumber(1).shiftedBy(ERC20_DECIMALS).toString();
      await cUSDContract.methods
        .approve(contractAddress, price)
        .send({ from: address });
      await contract.methods.upvoteProduct(_index).send({ from: address });
      getBalance();
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const downvoteProduct = async (_index) => {
    const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
    try {
      const price = new BigNumber(1).shiftedBy(ERC20_DECIMALS).toString();
      await cUSDContract.methods
        .approve(contractAddress, price)
        .send({ from: address });
      await contract.methods.downvoteProduct(_index).send({ from: address });
      getBalance();
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (_name, _summary, _image) => {
    const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
    try {
      const price = new BigNumber(3).shiftedBy(ERC20_DECIMALS).toString();
      await cUSDContract.methods
        .approve(contractAddress, price)
        .send({ from: address });
      await contract.methods
        .addProduct(_name, _summary, _image)
        .send({ from: address });
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  useEffect(() => {
    celoConnect();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
    } else {
      console.log("no kit");
    }
  }, [kit, address]);

  useEffect(() => {
    if (contract) {
      getProducts();
    }
  }, [contract]);
  return (
    <div>
      <Navbar balance={cUSDBalance} />
      <Products
        products={products}
        upvoteProduct={upvoteProduct}
        downvoteProduct={downvoteProduct}
      />
      <AddProduct addProduct={addProduct} />
    </div>
  );
}

export default App;
