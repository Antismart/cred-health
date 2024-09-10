import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  DonationReceived,
  FundraiserApproved,
  FundraiserRequested,
  FundsDisbursed,
  HospitalRegistered,
  UserRegistered
} from "../generated/HospitalFundraisingPlatform/HospitalFundraisingPlatform"

export function createDonationReceivedEvent(
  fundraiserId: BigInt,
  donor: Address,
  amount: BigInt
): DonationReceived {
  let donationReceivedEvent = changetype<DonationReceived>(newMockEvent())

  donationReceivedEvent.parameters = new Array()

  donationReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "fundraiserId",
      ethereum.Value.fromUnsignedBigInt(fundraiserId)
    )
  )
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("donor", ethereum.Value.fromAddress(donor))
  )
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return donationReceivedEvent
}

export function createFundraiserApprovedEvent(
  fundraiserId: BigInt
): FundraiserApproved {
  let fundraiserApprovedEvent = changetype<FundraiserApproved>(newMockEvent())

  fundraiserApprovedEvent.parameters = new Array()

  fundraiserApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "fundraiserId",
      ethereum.Value.fromUnsignedBigInt(fundraiserId)
    )
  )

  return fundraiserApprovedEvent
}

export function createFundraiserRequestedEvent(
  fundraiserId: BigInt,
  patient: Address,
  hospital: Address,
  targetAmount: BigInt,
  description: string
): FundraiserRequested {
  let fundraiserRequestedEvent = changetype<FundraiserRequested>(newMockEvent())

  fundraiserRequestedEvent.parameters = new Array()

  fundraiserRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "fundraiserId",
      ethereum.Value.fromUnsignedBigInt(fundraiserId)
    )
  )
  fundraiserRequestedEvent.parameters.push(
    new ethereum.EventParam("patient", ethereum.Value.fromAddress(patient))
  )
  fundraiserRequestedEvent.parameters.push(
    new ethereum.EventParam("hospital", ethereum.Value.fromAddress(hospital))
  )
  fundraiserRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "targetAmount",
      ethereum.Value.fromUnsignedBigInt(targetAmount)
    )
  )
  fundraiserRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )

  return fundraiserRequestedEvent
}

export function createFundsDisbursedEvent(
  fundraiserId: BigInt,
  hospital: Address
): FundsDisbursed {
  let fundsDisbursedEvent = changetype<FundsDisbursed>(newMockEvent())

  fundsDisbursedEvent.parameters = new Array()

  fundsDisbursedEvent.parameters.push(
    new ethereum.EventParam(
      "fundraiserId",
      ethereum.Value.fromUnsignedBigInt(fundraiserId)
    )
  )
  fundsDisbursedEvent.parameters.push(
    new ethereum.EventParam("hospital", ethereum.Value.fromAddress(hospital))
  )

  return fundsDisbursedEvent
}

export function createHospitalRegisteredEvent(
  hospital: Address
): HospitalRegistered {
  let hospitalRegisteredEvent = changetype<HospitalRegistered>(newMockEvent())

  hospitalRegisteredEvent.parameters = new Array()

  hospitalRegisteredEvent.parameters.push(
    new ethereum.EventParam("hospital", ethereum.Value.fromAddress(hospital))
  )

  return hospitalRegisteredEvent
}

export function createUserRegisteredEvent(
  user: Address,
  userType: i32
): UserRegistered {
  let userRegisteredEvent = changetype<UserRegistered>(newMockEvent())

  userRegisteredEvent.parameters = new Array()

  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "userType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(userType))
    )
  )

  return userRegisteredEvent
}
