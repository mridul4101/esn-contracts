// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { RegistryDependent } from "../KycDapp/RegistryDependent.sol";
import { Governable } from "../Governance/Governable.sol";

/**
 * @title Storage
 * @dev Store & retreive value in a variable
 */
contract BuildSurvey is Governable, RegistryDependent {
    using SafeMath for uint256;

    // address owner;

    struct Survey {
        string title;
        address author;
        uint256 time;
        bool isPublic;
        //   uint[][10] feedback = new uint[][10](question);
    }

    mapping(bytes32 => mapping(address => uint8)) public accessUser; // 0- no access , 1- access can vote,  2-  access already voted
    mapping(bytes32 => Survey) public surveys;
    // mapping(address => bool) public KYC; //proxy
    // kyc-1 needed for user .

    event NewSurvey(address indexed user, bytes32 hash);
    event SentSurvey(bytes32 indexed hash, uint16[] answers);
    event Auth1(address indexed user, bytes32 hash);

    // constructor() {
    //     owner = msg.sender;
    // }

    modifier onlyKycApproved() {
        // require(KYC[msg.sender], "you need to complete your KYC");
        require(kycDapp().isKycLevel1(msg.sender), "BuildSurvery: KYC_NOT_APPROVED");
        _;
    }

    // modifier Govern() {
    //     require(msg.sender == owner, "you are not Authorized");
    //     _;
    // }

    // function setKYC(address user) public Govern {
    //     KYC[user] = true;
    // }

    function addSurvey(
        string memory _title,
        uint256 _time,
        bool _ispublic
    ) public payable onlyKycApproved returns (bytes32) {
        //   bytes memory source_b = toBytes(msg.sender);
        //   bytes memory source = abi.encodePacked(msg.sender);
        bytes32 hashedinput = keccak256(abi.encodePacked(_title, msg.sender));
        require((surveys[hashedinput].time == 0), "you have already build a Survey with this name");
        surveys[hashedinput].title = _title;
        surveys[hashedinput].time = _time;
        surveys[hashedinput].author = msg.sender;
        surveys[hashedinput].isPublic = _ispublic;
        emit NewSurvey(msg.sender, hashedinput);

        uint256 _reward = msg.value.mul(1).div(100);
        dayswappers().payToIntroducer{ value: _reward }(
            msg.sender,
            [uint256(50), uint256(0), uint256(50)]
        );
        (bool _success, ) = owner().call{ value: msg.value.sub(_reward) }("");
        require(_success, "BuildSurvey: PROFIT_TRANSFER_FAILING");

        return hashedinput;
    }

    function addUsers(bytes32 _survey, address[] memory users) public onlyKycApproved {
        for (uint256 i = 0; i < users.length; i++) {
            accessUser[_survey][users[i]] = 1;
            emit Auth1(msg.sender, _survey);
        }
    }

    function sendSurvey(bytes32 _survey, uint16[] memory _feedback) public {
        require(surveys[_survey].time >= block.timestamp, "Survey has Ended");
        if (surveys[_survey].isPublic == false) {
            require(accessUser[_survey][msg.sender] != 1, "You have no access for this survey");
        }
        require(accessUser[_survey][msg.sender] != 2, "You have already voted  for this survey");
        // surveys[_survey].feedback.push(_feedback);
        emit SentSurvey(_survey, _feedback);
        accessUser[_survey][msg.sender] = 2;
    }
}