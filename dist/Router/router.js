"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../Controllers/User/userController");
const adminController_1 = require("../Controllers/Admin/adminController");
const authLoginUser_1 = require("../Auth/LoginUsers/authLoginUser");
const authLoginAdmin_1 = require("../Auth/LoginAdmin/authLoginAdmin");
const productController_1 = require("../Controllers/Products/productController");
const salesControllers_1 = require("../Controllers/Sales/salesControllers");
const uploadConfigCore_1 = require("../Core/uploadConfigCore");
const router = (0, express_1.Router)();
const userController = new userController_1.UserController();
const adminController = new adminController_1.AdminController();
const loginUsercontroller = new authLoginUser_1.LoginController();
const loginAdminController = new authLoginAdmin_1.LoginAdmincontroller();
const uploadMulter = new uploadConfigCore_1.UploadMulter();
const productController = new productController_1.ProductController();
const saleController = new salesControllers_1.SalesController();
router.get("/users/:id", userController.listUsers);
router.post("/users/create", userController.createUser);
router.delete('/users/delete/:id', userController.deleteUser);
router.post('/users/login', loginUsercontroller.login);
router.get('/admin/:id', adminController.listAdmin);
router.post('/admin/create', adminController.createAdmin);
router.delete('/admin/delete/:id', adminController.deleteAdmin);
router.post('/admin/login', loginAdminController.loginAdmin);
router.get('/product/:id', productController.findAll);
router.post('/product/created', productController.create);
router.delete('/product/delete/:id', productController.delete);
router.post('/upload/image', uploadMulter.guard('uploads/image'), productController.upload);
router.get('/sales', saleController.findAll);
router.get('/sales/:userId', saleController.historySale);
router.get("/sales/:id", saleController.findOne);
router.post('/sales/create', saleController.create);
router.put('/sales/update/:id', saleController.updateSale);
router.delete('/sales/delete/:id', saleController.deleteSale);
// router.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


exports.default = router;
//# sourceMappingURL=router.js.map