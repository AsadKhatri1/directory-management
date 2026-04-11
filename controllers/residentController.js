// import { residentModel } from "../models/residentModel.js";

import { residentModel } from "../models/residentModel.js";
import validator from "validator";

const normalizePropertyType = (value) => {
  const allowedPropertyTypes = ["house", "flat", "shop"];
  const normalized = (value || "house").toLowerCase();
  return allowedPropertyTypes.includes(normalized) ? normalized : "house";
};

// ------------------------------- creating resident -----------------------------------------
export const residentController = async (req, res, next) => {
  const {
    FullName,
    Email,
    Phone,
    HouseNumber,
    CNIC,
    Profession,
    Qualification,
    DOB,
    NOCHolder,
    bAddress,
    officeTel,
    NOCIssue,
    NOCNo,
    vehicles,
    relatives,
    maids,
    tanents,
    Photo,
    CnicFile,
    NocFile,
    CantFile,
    VerificationFile,
    LisenceFile,
    residentType,
    propertyType,
  } = req.body;

  if (!FullName || !Email || !Phone || !HouseNumber || !CNIC || !Photo) {
    return res.status(400).json({
      success: false,
      message: "Please enter all required fields of form to continue",
    });
  }
  if (Phone.length < 11) {
    return res.status(400).json({
      success: false,
      message: "Phone number length should not be less than 11",
    });
  }
  if (!validator.isEmail(Email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter valid email",
    });
  }

  const userExists = await residentModel.findOne({ Email: Email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const newResident = new residentModel({
    FullName,
    Email,
    Phone,
    HouseNumber,
    CNIC,
    Profession,
    Qualification,
    DOB,
    NOCHolder,
    bAddress,
    officeTel,
    NOCIssue,
    NOCNo,
    vehicles,
    relatives,
    maids,
    tanents,
    Photo,
    CnicFile,
    NocFile,
    CantFile,
    VerificationFile,
    LisenceFile,
    residentType,
    propertyType: normalizePropertyType(propertyType),
  });

  await newResident.save();
  return res.status(200).send({
    success: true,
    message: "New resident registered succesfully",
    newResident,
  });
};

//---------------------------------- getting all residents -----------------------
export const allResidents = async (req, res) => {
  try {
    const residents = await residentModel.find().sort({ createdAt: -1 });
    if (!residents) {
      return res.status(400).send({
        success: false,
        message: "No resident found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "All residents list",
        residents,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getResidentByHouse = async (req, res) => {
  try {
    const { houseNo, type } = req.params;

    const residents = await residentModel
      .find({
        HouseNumber: houseNo,
        residentType: { $ne: type },
      })
      .sort({ createdAt: -1 });

    if (residents.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No matching residents found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Residents list (filtered by type)",
      residents,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

//---------------------------------- getting single resident -----------------------
export const resident = async (req, res) => {
  try {
    const { id } = req.params;
    const resident = await residentModel.findById(id);
    if (!resident) {
      return res.status(400).send({
        success: false,
        message: "No resident found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Single resident found",
        resident,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//---------------------------------- deleting a single resident -----------------------
export const deleteResident = async (req, res) => {
  try {
    const { id } = req.params;
    const resident = await residentModel.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Resident deleted",
      resident,
    });
  } catch (err) {
    console.log(err);
  }
};

//---------------------------------- updating a single resident -----------------------
export const updateResident = async (req, res) => {
  try {
    const { paid, numberOfMonths } = req.body;
    const { id } = req.params;

    if (paid === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide the payment status",
      });
    }

    if (paid && (numberOfMonths === undefined || numberOfMonths <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid number of months",
      });
    }

    let updateFields = { paid };

    if (paid) {
      const paidExpiry = new Date();
      paidExpiry.setMonth(paidExpiry.getMonth() + numberOfMonths);
      updateFields.paidExpiry = paidExpiry;
    } else {
      updateFields.paidExpiry = null;
    }

    const resident = await residentModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!resident) {
      return res.status(404).json({
        success: false,
        message: "Resident not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Payment status updated",
      resident,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
//---------------------------------- updating a single resident -----------------------
export const updateResidentData = async (req, res) => {
  try {
    const data = { ...req.body };
    if (Object.prototype.hasOwnProperty.call(data, "propertyType")) {
      data.propertyType = normalizePropertyType(data.propertyType);
    }
    const { id } = req.params;

    const resident = await residentModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!resident) {
      return res.status(404).json({
        success: false,
        message: "Resident not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Payment status updated",
      resident,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// ---------------- search API ------------------------

// export const searchResident = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) - 1 || 0;
//     const limit = parseInt(req.query.limit) || 10;
//     const search = req.query.search || "";
//     const residents = await residentModel
//       .find({ name: { $regex: search, $option: "i" } })
//       .skip(page * limit)
//       .limit(limit);

//     return res.status(200).json({
//       success: true,
//       message: "Searched queries",
//       residents,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ Message: "Internal server error" });
//   }
// };

export const slipCreate = async (req, res) => {
  try {
    const { residentId } = req.params;
    const resident = await residentModel.findById(residentId);
    // const resident = await residentModel.findById(residentId);
    // Logic to generate the fee slip
    // Calculate total fee based on the fixed monthly fee and the number of months
    const numberOfMonths = req.body.numberOfMonths;
    const monthlyFee = 2500;
    const totalFee = numberOfMonths * monthlyFee;
    // Save the fee slip to the database or perform any other necessary actions
    // Return success message or fee slip data

    res.status(200).json({
      success: true,
      message: "Fee slip generated successfully",
      resident,
      totalFee,
      numberOfMonths,
    });
  } catch (error) {
    console.error("Error generating fee slip:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate fee slip" });
  }
};

// ----------- add/delete inner items

// Add Family Member
export const addFamilyMember = async (req, res) => {
  try {
    const { residentId } = req.params;
    const familyMemberData = req.body;

    const resident = await residentModel.findById(residentId);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    resident.relatives.push(familyMemberData);
    await resident.save();

    res.status(200).json({
      message: "Family member added successfully",
      familyMember: familyMemberData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding family member", error: error.message });
  }
};

// Delete Family Member
export const deleteFamilyMember = async (req, res) => {
  try {
    const { residentId, familyMemberId } = req.params;

    const resident = await residentModel.findById(residentId);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    resident.relatives = resident.relatives.filter(
      (member) => member._id.toString() !== familyMemberId,
    );
    await resident.save();

    res.status(200).json({ message: "Family member deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting family member", error: error.message });
  }
};

// edit family member
// Edit Family Member
export const editFamilyMember = async (req, res) => {
  try {
    const { residentId, familyMemberId } = req.params;
    const updatedData = req.body;

    const resident = await residentModel.findById(residentId);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    // Find family member by ID
    const familyMember = resident.relatives.id(familyMemberId);
    if (!familyMember) {
      return res.status(404).json({ message: "Family member not found" });
    }

    // Update fields
    Object.keys(updatedData).forEach((key) => {
      familyMember[key] = updatedData[key];
    });

    await resident.save();

    res.status(200).json({
      message: "Family member updated successfully",
      familyMember,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating family member", error: error.message });
  }
};

// Add Vehicle
export const addVehicle = async (req, res) => {
  try {
    const { residentId } = req.params;
    const vehicleData = req.body;

    const resident = await residentModel.findById(residentId);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    resident.vehicles.push(vehicleData);
    await resident.save();

    res.status(200).json({
      message: "Vehicle added successfully",
      vehicle: vehicleData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding vehicle", error: error.message });
  }
};

// Delete Vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const { residentId, vehicleId } = req.params;

    const resident = await residentModel.findById(residentId);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    resident.vehicles = resident.vehicles.filter(
      (vehicle) => vehicle._id.toString() !== vehicleId,
    );
    await resident.save();

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting vehicle", error: error.message });
  }
};

// Add Maid (Servant)
export const addMaid = async (req, res) => {
  try {
    const { residentId } = req.params;
    const maidData = req.body;

    const resident = await residentModel.findById(residentId);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    resident.maids.push(maidData);
    await resident.save();

    res.status(200).json({
      message: "Maid added successfully",
      maid: maidData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding maid", error: error.message });
  }
};

// Delete Maid (Servant)
export const deleteMaid = async (req, res) => {
  try {
    const { residentId, maidId } = req.params;

    const resident = await residentModel.findById(residentId);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    resident.maids = resident.maids.filter(
      (maid) => maid._id.toString() !== maidId,
    );
    await resident.save();

    res.status(200).json({ message: "Maid deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting maid", error: error.message });
  }
};

// Add Tenant
export const addTenant = async (req, res) => {
  try {
    const { residentId } = req.params;
    const tenantData = req.body;

    const resident = await residentModel.findById(residentId);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    resident.tanents.push(tenantData);
    await resident.save();

    res.status(200).json({
      message: "Tenant added successfully",
      tenant: tenantData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding tenant", error: error.message });
  }
};

// Delete Tenant
export const deleteTenant = async (req, res) => {
  try {
    const { residentId, tenantId } = req.params;

    const resident = await residentModel.findById(residentId);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    resident.tanents = resident.tanents.filter(
      (tenant) => tenant._id.toString() !== tenantId,
    );
    await resident.save();

    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting tenant", error: error.message });
  }
};
