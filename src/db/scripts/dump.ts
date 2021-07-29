// import "reflect-metadata";
// import { Category, SubCategory, ProductType, Product, User } from '../models';

// const execute = async () => {
//     const subCat = await SubCategory.create({
//         name: 'M'
//     });

//     const cat = await Category.create({
//         name: 'Shirt',
//         icon: 'shirt'
//     })

//     const product = await Product.create({
//         categoryId: cat.id,
//         categoryName: 'Shirt',
//         subCategoryId: subCat.id,
//         subCategoryName: 'M',
//         name: 'Classic Shirt',
//         slug: 'classicshirt',
//         price: 599,
//         details: 'A classic mens shirt with electric desgin for a fresh and beautiful day.',
//         images: 'image1,image2,image3'
//     })

//     const productType = await ProductType.create({
//         productId: product.id,
//         type: 'Shirt-Red',
//         quantity: 100
//     });

//     await User.create({
//         firstName: "Test",
//         lastName: "User",
//         email: "test@rubix.com",
//         phone: "12345678",
//         password: "helloworld",
//         role: "Customer",
//         blocked: false,
//         confirmed: true,
//         provider: "direct"
//     });
// };



// import dotenv from "dotenv";
// dotenv.config();

// import sequelize from "../utils/connection.mariadb";

// sequelize.sync({force: false}).then(() => {

//     execute().then(() => {
//         console.log('Loaded!')
//     });

// }).catch(error=> {
//     console.error(error);
// });