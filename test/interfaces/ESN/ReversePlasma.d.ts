/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import {
  ethers,
  Contract,
  ContractTransaction,
  PopulatedTransaction,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  BytesLike,
  ContractInterface,
  Overrides,
} from 'ethers';

export class ReversePlasma extends Contract {
  functions: {
    ethBlockchain(
      arg0: BigNumberish
    ): Promise<{
      transactionsRoot: string;
      receiptsRoot: string;
      0: string;
      1: string;
    }>;

    ethProposals(
      arg0: BigNumberish,
      arg1: BigNumberish
    ): Promise<{
      transactionsRoot: string;
      receiptsRoot: string;
      0: string;
      1: string;
    }>;

    finalizeProposal(
      _blockNumber: BigNumberish,
      _proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    findProposal(
      _blockNumber: BigNumberish,
      _transactionsRoot: BytesLike,
      _receiptsRoot: BytesLike
    ): Promise<{
      0: boolean;
      1: BigNumber;
    }>;

    getAllValidators(): Promise<{
      0: string[];
    }>;

    getProposalValidators(
      _blockNumber: BigNumberish,
      _proposalId: BigNumberish
    ): Promise<{
      0: string[];
    }>;

    getProposalsCount(
      _blockNumber: BigNumberish
    ): Promise<{
      0: BigNumber;
    }>;

    isValidator(
      _validator: string
    ): Promise<{
      0: boolean;
    }>;

    latestBlockNumber(): Promise<{
      0: BigNumber;
    }>;

    mainValidators(
      arg0: BigNumberish
    ): Promise<{
      0: string;
    }>;

    proposeBlock(_blockHeader: BytesLike, overrides?: Overrides): Promise<ContractTransaction>;

    reverseDepositAddress(): Promise<{
      0: string;
    }>;

    setInitialValues(
      _tokenOnETH: string,
      _startBlockNumber: BigNumberish,
      _validators: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    tokenOnETH(): Promise<{
      0: string;
    }>;

    updateDepositAddress(
      _reverseDepositAddress: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  ethBlockchain(
    arg0: BigNumberish
  ): Promise<{
    transactionsRoot: string;
    receiptsRoot: string;
    0: string;
    1: string;
  }>;

  ethProposals(
    arg0: BigNumberish,
    arg1: BigNumberish
  ): Promise<{
    transactionsRoot: string;
    receiptsRoot: string;
    0: string;
    1: string;
  }>;

  finalizeProposal(
    _blockNumber: BigNumberish,
    _proposalId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  findProposal(
    _blockNumber: BigNumberish,
    _transactionsRoot: BytesLike,
    _receiptsRoot: BytesLike
  ): Promise<{
    0: boolean;
    1: BigNumber;
  }>;

  getAllValidators(): Promise<string[]>;

  getProposalValidators(_blockNumber: BigNumberish, _proposalId: BigNumberish): Promise<string[]>;

  getProposalsCount(_blockNumber: BigNumberish): Promise<BigNumber>;

  isValidator(_validator: string): Promise<boolean>;

  latestBlockNumber(): Promise<BigNumber>;

  mainValidators(arg0: BigNumberish): Promise<string>;

  proposeBlock(_blockHeader: BytesLike, overrides?: Overrides): Promise<ContractTransaction>;

  reverseDepositAddress(): Promise<string>;

  setInitialValues(
    _tokenOnETH: string,
    _startBlockNumber: BigNumberish,
    _validators: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  tokenOnETH(): Promise<string>;

  updateDepositAddress(
    _reverseDepositAddress: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  filters: {
    NewBlockHeader(blockNumber: null, proposalId: null): EventFilter;
  };

  estimateGas: {
    ethBlockchain(arg0: BigNumberish): Promise<BigNumber>;

    ethProposals(arg0: BigNumberish, arg1: BigNumberish): Promise<BigNumber>;

    finalizeProposal(_blockNumber: BigNumberish, _proposalId: BigNumberish): Promise<BigNumber>;

    findProposal(
      _blockNumber: BigNumberish,
      _transactionsRoot: BytesLike,
      _receiptsRoot: BytesLike
    ): Promise<BigNumber>;

    getAllValidators(): Promise<BigNumber>;

    getProposalValidators(
      _blockNumber: BigNumberish,
      _proposalId: BigNumberish
    ): Promise<BigNumber>;

    getProposalsCount(_blockNumber: BigNumberish): Promise<BigNumber>;

    isValidator(_validator: string): Promise<BigNumber>;

    latestBlockNumber(): Promise<BigNumber>;

    mainValidators(arg0: BigNumberish): Promise<BigNumber>;

    proposeBlock(_blockHeader: BytesLike): Promise<BigNumber>;

    reverseDepositAddress(): Promise<BigNumber>;

    setInitialValues(
      _tokenOnETH: string,
      _startBlockNumber: BigNumberish,
      _validators: string[]
    ): Promise<BigNumber>;

    tokenOnETH(): Promise<BigNumber>;

    updateDepositAddress(_reverseDepositAddress: string): Promise<BigNumber>;
  };

  populateTransaction: {
    ethBlockchain(arg0: BigNumberish): Promise<PopulatedTransaction>;

    ethProposals(arg0: BigNumberish, arg1: BigNumberish): Promise<PopulatedTransaction>;

    finalizeProposal(
      _blockNumber: BigNumberish,
      _proposalId: BigNumberish
    ): Promise<PopulatedTransaction>;

    findProposal(
      _blockNumber: BigNumberish,
      _transactionsRoot: BytesLike,
      _receiptsRoot: BytesLike
    ): Promise<PopulatedTransaction>;

    getAllValidators(): Promise<PopulatedTransaction>;

    getProposalValidators(
      _blockNumber: BigNumberish,
      _proposalId: BigNumberish
    ): Promise<PopulatedTransaction>;

    getProposalsCount(_blockNumber: BigNumberish): Promise<PopulatedTransaction>;

    isValidator(_validator: string): Promise<PopulatedTransaction>;

    latestBlockNumber(): Promise<PopulatedTransaction>;

    mainValidators(arg0: BigNumberish): Promise<PopulatedTransaction>;

    proposeBlock(_blockHeader: BytesLike): Promise<PopulatedTransaction>;

    reverseDepositAddress(): Promise<PopulatedTransaction>;

    setInitialValues(
      _tokenOnETH: string,
      _startBlockNumber: BigNumberish,
      _validators: string[]
    ): Promise<PopulatedTransaction>;

    tokenOnETH(): Promise<PopulatedTransaction>;

    updateDepositAddress(_reverseDepositAddress: string): Promise<PopulatedTransaction>;
  };
}
