// const { response } = require("express");
const Employee = require("../../models/Employee");

const index = (req, res, next) => {
    Employee.find()
        .then(response => {
            res.json({
                response,
            })
        })
        .catch(error => {
            res.json({
                message: 'eroor Occured',
            })
        });
};

const show = (req, res, next) => {
    let employeeID = req.body.employeeID;
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                response,
            })
        })
        .catch(error => {
            res.json({
                message: 'eroor Occured',
            })
        });
};

const store = (req, res, next) => {

    const employee = new Employee({
        name: req.body.name
        // email: req.body.email,
        // designation: req.body.designation,
        // phone: req.body.phone
        // age: req.body.age
    })
    // if (req.name) {
    //     employee.name: req.file.path
    // }
    employee.save()
        .then(response => {
            res.json({
                message: 'Employee Added Successfully!',
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!',
            })
        })

};

const update = (req, res, next) => {
    let employeeID = req.body.employeeID;
    let updateData = {
        name: req.body.name,
        phone: req.body.phone,
    }
    Employee.findByIdAndUpdate(employeeID, { $set: updateData })
        .then(() => {
            res.json({
                message: 'Employee update successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
};

const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID;
    Employee.findByIdAndRemove(employeeID)
        .then(() => {
            req.json({
                message: 'Employee deleted successfully'
            })
        })
        .catch(error => {
            req.json({
                message: 'An error Occured!'
            })
        })
};

module.exports = {
    index, show, store, update, destroy
};
// const index (req, res, next) => {
//     Employee.find()
//         .then(response => {
//             res.json({
//                 response
//             })
//         })
//         .catch(error => {
//             res.json({
//                 message: "error"
//             })
//         })
// }
// const store = (req, res, next) => {
//     const employee = new Employee
// }

// const store (req, res, next) => { =
//     name: req.body.name,
//         let employee = new Employee({ = email: req.body.email,
//             designation: req.body.designation,
//             phone: req.body.phone,
//             age: req.body.age
//         })
//     if (req.file) {
//         employee.avatar req.file.path
//     }
//     employee.save()
//         .then(response => {
//             res.json({
//                 message: 'Employee Added Successfully!'
//             })

//         })
//         .catch(error =>

//             res.json({

//                 message:

//                     'An error Occured!'


//             })