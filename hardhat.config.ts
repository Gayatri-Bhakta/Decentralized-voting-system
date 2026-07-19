import { defineConfig } from "hardhat/config";
import ignitionEthers from "@nomicfoundation/hardhat-ignition-ethers";

export default defineConfig({
  solidity: {
    version: "0.8.28",
  },
  plugins: [
    ignitionEthers
  ]
});