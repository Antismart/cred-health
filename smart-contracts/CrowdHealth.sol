// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CrowdHealth is ReentrancyGuard {
    address public owner;

    struct Hospital {
        address hospitalAddress;
        bool isRegistered;
        uint256 totalFundraisersProcessed;
        uint256 totalAmountRaised;
    }

    struct Fundraiser {
        address patient;
        address hospital;
        uint256 targetAmount;
        uint256 amountRaised;
        string condition;
        bool completed;
        bool approved;
    }

    enum UserType { Patient, Donor }

    struct User {
        address userAddress;
        UserType userType;
        bool isRegistered;
        string condition; // Only for patients
        address hospital; // Only for patients
    }

    mapping(address => Hospital) public hospitals;
    mapping(uint256 => Fundraiser) public fundraisers;
    mapping(address => uint256[]) public patientFundraisers;
    mapping(address => User) public users;

    uint256 public fundraiserCounter;

    event HospitalRegistered(address indexed hospital);
    event UserRegistered(address indexed user, UserType userType);
    event FundraiserRequested(
        uint256 indexed fundraiserId,
        address indexed patient,
        address indexed hospital,
        uint256 targetAmount
    );
    event FundraiserApproved(uint256 indexed fundraiserId);
    event FundsDisbursed(uint256 indexed fundraiserId, address indexed hospital);
    event DonationReceived(uint256 indexed fundraiserId, address indexed donor, uint256 amount);

    modifier onlyRegisteredHospital(address _hospital) {
        require(hospitals[_hospital].isRegistered, "Not a registered hospital");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyRegisteredUser(address _user) {
        require(users[_user].isRegistered, "User is not registered");
        _;
    }

    constructor() {
        owner = msg.sender; // Assign the contract deployer as the owner
    }

    function registerHospital(address _hospital) external onlyOwner {
        require(!hospitals[_hospital].isRegistered, "Hospital already registered");
        hospitals[_hospital] = Hospital(_hospital, true, 0, 0);
        emit HospitalRegistered(_hospital);
    }

    function registerUser(UserType _userType, string memory _condition, address _hospital) external {
        require(!users[msg.sender].isRegistered, "User already registered");

        if (_userType == UserType.Patient) {
            require(bytes(_condition).length > 0, "Condition is required for patients");
            require(hospitals[_hospital].isRegistered, "Associated hospital must be registered");
            users[msg.sender] = User(msg.sender, _userType, true, _condition, _hospital);
        } else {
            users[msg.sender] = User(msg.sender, _userType, true, "", address(0));
        }

        emit UserRegistered(msg.sender, _userType);
    }

    function requestFundraiser(uint256 _targetAmount)
        external
        nonReentrant
        onlyRegisteredUser(msg.sender)
    {
        User storage user = users[msg.sender];
        require(user.userType == UserType.Patient, "Only patients can request fundraisers");
        require(_targetAmount > 0, "Target amount must be greater than zero");

        fundraisers[fundraiserCounter] = Fundraiser(
            msg.sender,
            user.hospital,
            _targetAmount,
            0,
            user.condition,
            false,
            true // Automatically approve fundraisers for simplicity
        );
        patientFundraisers[msg.sender].push(fundraiserCounter);

        emit FundraiserRequested(fundraiserCounter, msg.sender, user.hospital, _targetAmount);

        fundraiserCounter++;
    }

    function donateToFundraiser(uint256 _fundraiserId) external payable nonReentrant {
        Fundraiser storage fundraiser = fundraisers[_fundraiserId];
        require(fundraiser.approved, "Fundraiser not approved");
        require(!fundraiser.completed, "Fundraiser already completed");
        require(msg.value > 0, "Donation must be greater than zero");

        fundraiser.amountRaised += msg.value;

        emit DonationReceived(_fundraiserId, msg.sender, msg.value);

        // Check if the target amount is reached
        if (fundraiser.amountRaised >= fundraiser.targetAmount) {
            fundraiser.completed = true;
            disburseFunds(_fundraiserId);
        }
    }

    function disburseFunds(uint256 _fundraiserId)
        internal
        nonReentrant
    {
        Fundraiser storage fundraiser = fundraisers[_fundraiserId];
        require(hospitals[fundraiser.hospital].isRegistered, "Hospital not registered");
        require(fundraiser.completed, "Fundraising not completed");

        hospitals[fundraiser.hospital].totalFundraisersProcessed++;
        hospitals[fundraiser.hospital].totalAmountRaised += fundraiser.amountRaised;

        (bool success, ) = fundraiser.hospital.call{value: fundraiser.amountRaised}("");
        require(success, "Transfer failed");

        emit FundsDisbursed(_fundraiserId, fundraiser.hospital);
    }

    function withdrawFunds(uint256 _amount) external onlyOwner nonReentrant {
        (bool success, ) = owner.call{value: _amount}("");
        require(success, "Withdraw failed");
    }

    // Retrieve details
    function getFundraiserDetails(uint256 _fundraiserId)
        external
        view
        returns (Fundraiser memory)
    {
        return fundraisers[_fundraiserId];
    }

    function getPatientFundraisers(address _patient)
        external
        view
        returns (uint256[] memory)
    {
        return patientFundraisers[_patient];
    }

    function getHospitalDetails(address _hospital)
        external
        view
        returns (Hospital memory)
    {
        return hospitals[_hospital];
    }

    // Accept ether for fundraising
    receive() external payable {}
}
