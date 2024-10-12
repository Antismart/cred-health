// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HospitalFundraisingPlatform {
    address public owner;
    address[] private registeredHospitals;

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
        string description;
        bool completed;
        bool approved;
    }

    enum UserType {
        Patient,
        Donor
    }

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
    event PatientRegistered(address indexed user, address indexed hospital);
    event DonorRegistered(address indexed user);
    event FundraiserRequested(
        uint256 indexed fundraiserId,
        address indexed patient,
        address indexed hospital,
        uint256 targetAmount,
        string description
    );
    event FundraiserApproved(uint256 indexed fundraiserId);
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
        registeredHospitals.push(_hospital); // Add the hospital to the list of registered hospitals
        emit HospitalRegistered(_hospital);
    }

    // Function to get all registered hospitals
    function getAllHospitals() external view returns (address[] memory) {
        return registeredHospitals;
    }

    // Function to register a patient
    function registerPatient(string memory _condition, address _hospital) external {
        require(!users[msg.sender].isRegistered, "User already registered");
        require(bytes(_condition).length > 0, "Condition is required for patients");
        require(hospitals[_hospital].isRegistered, "Associated hospital must be registered");

        users[msg.sender] = User({
            userAddress: msg.sender,
            userType: UserType.Patient,
            isRegistered: true,
            condition: _condition,
            hospital: _hospital
        });

        emit PatientRegistered(msg.sender, _hospital);
    }

    // Function to register a donor
    function registerDonor() external {
        require(!users[msg.sender].isRegistered, "User already registered");

        users[msg.sender] = User({
            userAddress: msg.sender,
            userType: UserType.Donor,
            isRegistered: true,
            condition: "",
            hospital: address(0)
        });

        emit DonorRegistered(msg.sender);
    }

    // Function to create a fundraiser by a registered patient with user-inputted hospital
    function createFundraiser(uint256 _targetAmount, string memory _description, address _hospital)
        public onlyRegisteredUser(msg.sender) returns (uint256)
    {
        User storage user = users[msg.sender];
        require(user.userType == UserType.Patient, "Only patients can create fundraisers");
        require(_targetAmount > 0, "Target amount must be greater than zero");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(hospitals[_hospital].isRegistered, "Hospital must be registered");

        uint256 newFundraiserId = fundraiserCounter;
        fundraiserCounter++; // Increment the counter after assigning

        Fundraiser storage newFundraiser = fundraisers[newFundraiserId];
        newFundraiser.patient = msg.sender;
        newFundraiser.hospital = _hospital; // Use the hospital address input by the user
        newFundraiser.targetAmount = _targetAmount;
        newFundraiser.amountRaised = 0;
        newFundraiser.condition = user.condition;
        newFundraiser.description = _description;
        newFundraiser.completed = false;
        newFundraiser.approved = false; // Initially set to false; require manual approval

        patientFundraisers[msg.sender].push(newFundraiserId);

        emit FundraiserRequested(newFundraiserId, msg.sender, _hospital, _targetAmount, _description);
        return newFundraiserId;
    }

    // Owner function to approve a fundraiser
    function approveFundraiser(uint256 _fundraiserId) external onlyOwner {
        Fundraiser storage fundraiser = fundraisers[_fundraiserId];
        require(!fundraiser.approved, "Fundraiser is already approved");
        fundraiser.approved = true;

        emit FundraiserApproved(_fundraiserId);
    }

    // Function for donating in Ether
    function donateToFundraiser(uint256 _fundraiserId) external payable {
        Fundraiser storage fundraiser = fundraisers[_fundraiserId];
        // require(fundraiser.approved, "Fundraiser not approved");
        require(!fundraiser.completed, "Fundraiser already completed");

        // Update the amount raised by the fundraiser
        (bool success, ) = fundraiser.hospital.call{value: msg.value}("");
        fundraiser.amountRaised += msg.value;
        // Transfer the donation directly to the hospital
        
        require(success, "Donation transfer failed");

        emit DonationReceived(_fundraiserId, msg.sender, msg.value);

        // Check if the target amount is reached
        if (fundraiser.amountRaised >= fundraiser.targetAmount) {
            fundraiser.completed = true;
        }
    }

    function withdrawFunds(uint256 _amount) external onlyOwner {
        (bool success, ) = owner.call{value: _amount}("");
        require(success, "Withdraw failed");
    }

    // Retrieve details
    function getFundraiserDetails(uint256 _fundraiserId) external view returns (Fundraiser memory) {
        return fundraisers[_fundraiserId];
    }

    function getPatientFundraisers(address _patient) external view returns (uint256[] memory) {
        return patientFundraisers[_patient];
    }

    function getHospitalDetails(address _hospital) external view returns (Hospital memory) {
        return hospitals[_hospital];
    }

    // Accept ether for fundraising
    receive() external payable {}
}
