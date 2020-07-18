// SPDX-License-Identifier: MIT

pragma solidity ^0.6.10;

library Merkle {
    function verify(
        bytes32 leaf,
        uint256 mainIndex,
        bytes32 rootHash,
        bytes memory proof
    ) internal pure returns (bool) {
        bytes32 proofElement;
        bytes32 computedHash = leaf;
        require(proof.length % 32 == 0, "Merkle: invalid proof length");

        uint256 index = mainIndex;
        for (uint256 i = 32; i <= proof.length; i += 32) {
            assembly {
                proofElement := mload(add(proof, i))
            }

            if (index % 2 == 0) {
                computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
            } else {
                computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
            }

            index = index / 2;
        }
        return computedHash == rootHash;
    }
}
