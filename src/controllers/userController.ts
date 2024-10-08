import { Request, Response } from 'express';
import { sendSMS } from '../services/sms';
import { generateOtp, getSavedOtp, saveOtp } from '../services/otp';
import { addUser, fetchUser, fetchUserById } from '../services/user';
import { fetchAddressses, manageAddAddress, manageDeleteAddress, manageEditAddress } from '../services/address';
import { fetchUserCart } from '../services/cart';

const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const otp = generateOtp()
    const smsSent = await sendSMS(email, otp);

    if (smsSent) {
      const otpSaved = await saveOtp(email, otp)
      if (!otpSaved) {
        return res.status(500).json({
          success: false,
          message: 'Failed to handle OTP. Please try again.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Otp sent successfully',
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp, email } = req.body;
    if (!otp || !email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }
    const savedOtp = await getSavedOtp(email)

    if (!savedOtp) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found or has expired',
      });
    }

    if (savedOtp.otp === otp) {
      const user = await fetchUser(email)
      return res.status(200).json({
        success: true,
        message: 'Entered OTP is correct',
        data: user
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Entered OTP is incorrect',
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const signUp = async (req: Request, res: Response) => {
  try {
    const { name, mobile, password, email } = req.body;

    if (!name || !mobile || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    const userExist = await fetchUser(email)
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
        data: userExist
      });
    }

    const savedUser = await addUser(name, email, mobile)
    if (savedUser) {
      return res.status(200).json({
        success: true,
        message: 'New user created',
        data: savedUser
      });

    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


const addAddress = async (req: Request, res: Response) => {
  try {
    const { userId, street, city, state, postalCode, coordinates } = req.body;

    if (!userId || !street || !city || !state || !postalCode || !coordinates) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    const addressAdded = await manageAddAddress(userId, street, city, state, postalCode, coordinates);
    if (addressAdded) {
      return res.status(200).json({
        success: true,
        message: 'New address added',
        data: addressAdded
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Unable to add address',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.body;

    if (!addressId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    const deletedAddress = await manageDeleteAddress(addressId);
    if (deletedAddress) {
      return res.status(200).json({
        success: true,
        message: 'Address deleted successfully',
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Unable to delete address',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const editAddress = async (req: Request, res: Response) => {
  try {
    const { addressId, street, city, state, postalCode, coordinates } = req.body;

    const editedAddress = await manageEditAddress(addressId, street, city, state, postalCode, coordinates);
    if (editedAddress) {
      return res.status(200).json({
        success: true,
        message: 'Address updated successfully',
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Unable to update address',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


const getCheckoutPageDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    const cart = await fetchUserCart(userId)
    const addresses = await fetchAddressses(userId)

    if (cart) {
      console.log({
        cart,
        addresses
      });

      return res.status(200).json({
        success: true,
        data: {
          cart,
          addresses
        }
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Unable to fetch checkout page details',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


const fetchProfileData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await fetchUserById(userId)
    if (user) {
      const addresses = await fetchAddressses(userId)
      return res.status(200).json({
        success: false,
        data: {
          user,
          addresses
        }
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Unable to fetch profile page details',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}



export default {
  sendOtp,
  verifyOtp,
  signUp,
  addAddress,
  deleteAddress,
  editAddress,
  getCheckoutPageDetails,
  fetchProfileData
}