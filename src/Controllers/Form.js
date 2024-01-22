const Form = require("../Models/Form")

exports.addForm = async (req,res) => {
    try {
        const { name, number, email, message, interest } = req.body
        const _form = new Form(req.body)
        await _form.save()
        res.status(201).json({ message: "Form Has Been Sumitted" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error" })
    }
}