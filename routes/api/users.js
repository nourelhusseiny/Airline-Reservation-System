const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../../models/User');


router.post('/registration', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			username: req.body.username,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: newPassword,
			passport: req.body.passport,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

router.post('/login', async (req, res) => {
	const user = await User.findOne({
		username: req.body.username,
	})

	if (!user) {
    console.log('User not found')
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
    console.log('User logged in')
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
				email: user.email,
			},
			'secret123'
		)
      //console.log('token '+ token)

		return res.json(token)
	} else {
    console.log('Wrong password')
		//return res.json({ status: 'error', user: false })
	}
})

module.exports = router;