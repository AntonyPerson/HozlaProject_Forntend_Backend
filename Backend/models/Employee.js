const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String
    },
}, { timestamps: true })

const Employee = mongoose.model("Employee", employeeSchema);
module.export = Employee;