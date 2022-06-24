import erc_abi from './json/ERC20.json';
import Contract from 'web3-eth-contract'
import word_abi from './json/Word.json';
import sentence_abi from './json/Sentence.json'
import merge_abi from './json/Merge.json'
import textarea_abi from './json/TextArea.json'
import mint_abi from './json/MintSharingSystem.json'
import token_abi from './json/TokenDistributor.json'
import Web3 from 'web3'
import WalletConnectProvider from "@walletconnect/web3-provider";

/**********************************Test Contract Address**************************************/

export const address = {
    //TEST rinkeby
    // MockWETH:0x191944250A597d3F1c4e6B5ce28976886658f032
    // MockNft:0x600768F5b9CB64B1Cf7E3404c92D7dBCDF9FF0C2
    // TextArea:0x305Db03d3E0D2067daf33A0bF751c77ACb7808D2
    // TokenSplitter:0xE519630E1561065Da4E755BD59630135332d7b22
    // TokenDistributor:0x63c47263B70033319036c2ae0EEF5358f1eE4419
    // MintSharingSystem:0x98645d0D83BC47968b1Cad0B6EDdAfe4E75D6088
    // MineCollector:0x723e3cbDe7C0015eadBA445e5325c28af2621143
    // Word:0x8D45FC59143C1741807d4A1F03956A5AeC303463
    // Sentence:0x26572469B798327978DBA222e8bCC500528d9dB5
    // Merge:0xE679571C9FbbF69AE1eEE1823eEa780A40f990B6
    // 2022/04/15
    word: '0x8D45FC59143C1741807d4A1F03956A5AeC303463',
    sentence: '0x26572469B798327978DBA222e8bCC500528d9dB5',
    merge: '0xE679571C9FbbF69AE1eEE1823eEa780A40f990B6',
    testWeth: '0x191944250A597d3F1c4e6B5ce28976886658f032',// TEST weth Address
    testNft: '0x600768F5b9CB64B1Cf7E3404c92D7dBCDF9FF0C2',// TEST nft Address
    textArea: '0x305Db03d3E0D2067daf33A0bF751c77ACb7808D2',// TEST textArea Address
    mintSharingSystem: '0x98645d0D83BC47968b1Cad0B6EDdAfe4E75D6088',// TEST Stake
    tokenDistributor: '0x63c47263B70033319036c2ae0EEF5358f1eE4419',
}
export const provider = new WalletConnectProvider({
    infuraId: "7fcec0ff3f8b4a98aca48a90bb7dc48c",
});
let web3 = null;
if (window.ethereum) {
    Contract.setProvider(window.ethereum);
    web3 =new Web3(window.ethereum)
} else {
    console.log(provider,"<=provider")
    Contract.setProvider(provider);
    web3 = new Web3(provider);
}
let tokenDistributorContract = new Contract(token_abi.abi, address.tokenDistributor);
let textareaContract = new Contract(textarea_abi.abi, address.textArea);
let mintContract = new Contract(mint_abi.abi, address.mintSharingSystem);
let wordContract = new Contract(word_abi.abi, address.word);
let sentenceContract = new Contract(sentence_abi.abi, address.sentence);
let mergeContract = new Contract(merge_abi.abi, address.merge);

export const initContracts = (ContractInput) => {
    return {
        address: address,
        web3,
        provider:provider,
        tokenDistributorContract: tokenDistributorContract,
        textareaContract: textareaContract,
        mintContract: mintContract,
        wordContract: wordContract,
        sentenceContract: sentenceContract,
        mergeContract: mergeContract,
        getOtherContracts: new Contract(merge_abi.abi, ContractInput),
    }
}
