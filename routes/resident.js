import express from 'express';
import { auth } from '../middlewears/auth.js';
import {
  allResidents,
  deleteResident,
  resident,
  residentController,
  updateResident,
  slipCreate,
  updateResidentData,
  addFamilyMember,
  deleteFamilyMember,
  addVehicle,
  deleteVehicle,
  addMaid,
  deleteMaid,
  addTenant,
  deleteTenant,
  getResidentByHouse,
  editFamilyMember,
} from '../controllers/residentController.js';

const router = express.Router();

router.post('/add', auth, residentController);

router.get('/getResidents', allResidents);
router.get('/getResident/:id', resident);
router.get('/getResident/:houseNo/:type', getResidentByHouse);
router.delete('/deleteResident/:id', auth, deleteResident);
router.put('/updateResident/:id', auth, updateResident);
router.put('/updateResidentData/:id', auth, updateResidentData);
router.post('/generateSlip/:residentId', auth, slipCreate);
// Family Member Routes
router.post('/:residentId/family-members', addFamilyMember);
router.delete(
  '/:residentId/family-members/:familyMemberId',
  deleteFamilyMember
);
router.put('/:residentId/family-members/:familyMemberId', editFamilyMember);

// Vehicle Routes
router.post('/:residentId/vehicles', addVehicle);
router.delete('/:residentId/vehicles/:vehicleId', deleteVehicle);

// Maid Routes
router.post('/:residentId/maids', addMaid);
router.delete('/:residentId/maids/:maidId', deleteMaid);

// Tenant Routes
router.post('/:residentId/tenants', addTenant);
router.delete('/:residentId/tenants/:tenantId', deleteTenant);

export default router;
