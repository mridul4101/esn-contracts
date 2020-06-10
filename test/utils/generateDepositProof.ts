import { ethers } from 'ethers';
import { GetProof } from 'eth-proof';

export async function generateDepositProof(txHash: string): Promise<string> {
  const gp = new GetProof(global.providerETH.connection.url);
  const txProof = await gp.transactionProof(txHash);
  const rcProof = await gp.receiptProof(txHash);
  // console.log({ txProof, rcProof });

  const tx = await global.providerETH.getTransaction(txHash);
  const rawTransaction = ethers.utils.serializeTransaction(
    {
      to: tx.to,
      nonce: tx.nonce,
      gasPrice: tx.gasPrice,
      gasLimit: tx.gasLimit,
      data: tx.data,
      value: tx.value,
      chainId: tx.chainId,
    },
    {
      // @ts-ignore
      r: tx.r,
      s: tx.s,
      v: tx.v,
    }
  );
  // console.log({ tx, rawTransaction, m: ethers.utils.keccak256(rawTransaction) });

  const rawReceipt = await getRawReceipt(txHash, global.providerETH);

  // console.log({ 'txProof.txProof': txProof.txProof, 'rcProof.receiptProof': rcProof.receiptProof });

  const preparingValues = {
    // @ts-ignore
    blockNumber: ethers.utils.hexlify(tx.blockNumber),
    path: getPathFromTransactionIndex(+txProof.txIndex),
    rawTransaction,
    parentNodesTx: ethers.utils.RLP.encode(txProof.txProof),
    rawReceipt,
    parentNodesReceipt: ethers.utils.RLP.encode(rcProof.receiptProof),
  };
  // console.log({ preparingValues });

  const proofArray = Object.values(preparingValues);
  // console.log(proofArray);

  return ethers.utils.RLP.encode(proofArray);
}

async function getRawReceipt(txHash: string, provider: ethers.providers.Provider): Promise<string> {
  const receiptObj = await provider.getTransactionReceipt(txHash);
  // console.log({ receiptObj });

  return ethers.utils.RLP.encode([
    // @ts-ignore
    ethers.utils.hexlify(receiptObj.status || receiptObj.root),
    receiptObj.cumulativeGasUsed.toHexString(),
    receiptObj.logsBloom,
    receiptObj.logs.map((log) => {
      return [log.address, log.topics, log.data];
    }),
  ]);
}

function getPathFromTransactionIndex(txIndex: number): string | null {
  if (typeof txIndex !== 'number') {
    return null;
  }
  if (txIndex === 0) {
    return '0x0080';
  }
  const hex = txIndex.toString(16);
  // return '0x'+(hex.length%2?'00':'1')+hex;
  return '0x' + '00' + hex;
}