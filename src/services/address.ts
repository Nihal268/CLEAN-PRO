import { Address, IAddress } from "../models/address"

export const manageAddAddress = async (userId: string, street: string, city: string, state: string, postalCode: string, coordinates: number[]) => {
  const address = await Address.create(
    {
      userId, street, city, state, postalCode,
      location: {
        type: 'Point',
        coordinates: coordinates
      }
    })
  return address
}

export const manageDeleteAddress = async (addressId: string) => {
  const deleted = await Address.findByIdAndDelete(addressId)
  return deleted
}


export const manageEditAddress = async (addressId: string, street: string, city: string, state: string, postalCode: string, coordinates?: [number, number]) => {
  const updateFields: Partial<IAddress> = {};

  if (street) updateFields.street = street;
  if (city) updateFields.city = city;
  if (state) updateFields.state = state;
  if (postalCode) updateFields.postalCode = postalCode;
  if (coordinates) {
    updateFields.location = {
      type: 'Point',
      coordinates: coordinates,
    };
  }
  const edited = await Address.findByIdAndUpdate(
    addressId,
    { $set: updateFields },
    { new: true }
  );
  return edited
} 