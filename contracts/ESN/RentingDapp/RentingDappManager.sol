// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import { ProductManager } from "./ProductManager.sol";
import { RegistryDependent } from "../KycDapp/RegistryDependent.sol";
import { IDayswappers } from "../Dayswappers/IDayswappers.sol";

contract RentingDappManager is RegistryDependent {
    // address public owner;
    address[] public items;
    mapping(address => bool) public isAuthorised;
    mapping(address => bool) public isAvailable;

    event ProductDetails(
        address indexed lessor,
        address item,
        string _name,
        string _description,
        string _location,
        uint256 _maxRent,
        uint256 _security,
        uint256 _cancellationFee,
        bytes32 indexed _categoryId,
        uint48 _listDate
    );

    // modifier onlyOwner() {
    //     require(msg.sender == owner, "Only manager can call this");
    //     _;
    // }

    modifier onlyKycApproved() {
        require(kycDapp().isKycLevel1(msg.sender), "RentingDapp: KYC_NOT_APPROVED");

        //require(kycDapp().isKycApproved(msg.sender, 3, 'RENTING_DAPP', 'LESSOR'), "RentingDapp: Lessor KYC_NOT_APPROVED for level 3");
        _;
    }

    modifier onlyAvailable() {
        require(isAvailable[msg.sender], "This item is no longer available");
        _;
    }

    constructor() {
        // owner = msg.sender;
        isAuthorised[msg.sender] = true;
    }

    function addItem(
        string memory _name,
        string memory _location,
        uint256 _maxRent,
        uint256 _security,
        uint256 _cancellationFee,
        string memory _description,
        bytes32 _categoryId,
        uint48 _listDate
    ) public onlyKycApproved {
        require(_maxRent > 0, "RentingDapp: You cannot list an item with rent = 0");
        ProductManager _newProduct =
            new ProductManager(
                _name,
                _location,
                msg.sender,
                items.length + 1,
                _maxRent,
                _security,
                _cancellationFee,
                _description,
                false /*can be managed at product manager*/
            );

        items.push(address(_newProduct));
        isAvailable[address(_newProduct)] = true;

        emit ProductDetails(
            msg.sender,
            address(_newProduct),
            _name,
            _description,
            _location,
            _maxRent,
            _security,
            _cancellationFee,
            _categoryId,
            _listDate
        );
    }

    function removeItem(address _item) public {
        isAvailable[_item] = false;
    }

    // Call this function through child contracts for sending rewards
    function payRewards(
        address _networker,
        uint256 _treeAmount,
        uint256 _introducerAmount
    ) public payable {
        require(
            msg.value == _treeAmount + _introducerAmount,
            "RentingDapp: Insufficient value sent"
        );

        // For this to work, setKycDapp needs to be called after contract is deployed
        IDayswappers _dayswappersContract = dayswappers();

        _dayswappersContract.payToTree{ value: _treeAmount }(
            _networker,
            [uint256(50), uint256(0), uint256(50)]
        );
        _dayswappersContract.payToIntroducer{ value: _introducerAmount }(
            _networker,
            [uint256(50), uint256(0), uint256(50)]
        );
    }
}
