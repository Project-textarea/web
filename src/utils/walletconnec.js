import Web3 from "web3"
import WalletConnectProvider from "@walletconnect/web3-provider"
const InfuraId = "774b1e4252de48c3997d66ac5f5078d8";
export default {
    provider: null,
    web3: null,
    async showQrcode() {
        if (typeof WalletConnectProvider === 'undefined') {
            return;
        }
        this.provider = new WalletConnectProvider({
            infuraId: InfuraId,
        });
        this.connect(this.provider);
    },
    async connect(provider){
        this.provider = provider;
        let that = this;
        await provider.enable().then(res => {
            that.web3 = new Web3(provider);
            that.init(provider)
        }).catch(err => {
            console.log(err)
        })
    },
    /**
     * Link established successfully
     */
    async init(provider) {
        // console.log("init")
        provider.on("accountsChanged", (accounts) => {
            console.log("accounts", accounts)
            provider.close()
        })
        provider.on("chainChanged", (chainId) => {
            console.log("chainId", chainId)
        })
        provider.on("networkChanged", (networkId) => {
            console.log("networkId", networkId)
        })
        provider.on("disconnect", (code, reason) => {
            console.log("disconnect", code, reason)
            sessionStorage.removeItem('address')
        })
        return await this.web3.eth.getAccounts()
    },
    async getAccounts() {
        //  Get Accounts
        return await this.web3.eth.getAccounts()
    },
    async getChainId() {
        return await this.web3.eth.getChainId()
    }
}