const m_users = require('../models/users')

const get_users = async (req, res) => {
	try {
		const [data] = await m_users.db_get_users()
		res.json({
			code: '200',
			status: 'Success',
			total: data.length,
			data
		})
	} catch (error) {
		res.status(500).json({
			code: '500',
			status: 'Server Error',
			error
		})
	}
}





const post_user = async (req, res) => {
	let error = {}
	const {body} = req
	if (! body.nama) error.nama = ['Nama tidak boleh kosong']
	if (! body.email) error.email = ['E-Mail tidak boleh kosong']

	if (Object.keys(error).length) {
		res.status(400).json({
			code: '400',
			status: 'Bad Request',
			error
		})
	}
	else {
		try {
			const [data] = await m_users.db_check_users_post(body.email)
			if (data.length) {
				res.status(400).json({
					code: '400',
					status: 'Bad Request',
					error: {
						email: ['E-Mail sudah terdaftar']
					}
				})
			}
			else {
				try {
					await m_users.db_insert_user(body)
					res.json({
						code: '200',
						status: 'Success',
						message: 'User berhasil ditambahkan'
					})
				} catch (err) {
					res.status(500).json({
						code: '500',
						status: 'Server Error',
						error: err
					})
				}
			}
		} catch (err) {
			res.status(500).json({
				code: '500',
				status: 'Server Error',
				error: err
			})
		}
	}
}





const patch_user = async (req, res) => {
	try {
		const id = req.params.id
		const [check_user] = await m_users.db_check_user(id)

		if (! check_user.length) {
			res.status(404).json({
				code: '404',
				status: 'Not Found',
				message: 'User tidak ditemukan'
			})
		}
		else {
			const {body} = req
			let error = {}
			if (! body.nama) error.nama = ['Nama tidak boleh kosong']
			if (! body.email) error.email = ['E-Mail tidak boleh kosong']

			if (Object.keys(error).length) {
				res.status(400).json({
					code: '400',
					status: 'Bad Request',
					error
				})
			}
			else {
				try {
					const [check_users_email] = await m_users.db_check_users_patch(id, body.email)

					if (check_users_email.length) {
						res.status(400).json({
							code: '400',
							status: 'Bad Request',
							error: {
								email: ['E-Mail sudah terdaftar']
							}
						})
					}
					else {
						try {
							await m_users.db_update_user(id, body)
							res.json({
								code: '200',
								status: 'Success',
								message: 'User berhasil diupdate'
							})
						} catch (err) {
							res.status(500).json({
								code: '500',
								status: 'Server Error',
								error: err
							})
						}
					}
				} catch (err) {
					res.status(500).json({
						code: '500',
						status: 'Server Error',
						error: err
					})
				}
			}
		}
	} catch (err) {
		res.status(500).json({
			code: '500',
			status: 'Server Error',
			error: err
		})
	}
}





const delete_user = async (req, res) => {
	try {
		const id = req.params.id
		const [check_user] = await m_users.db_check_user(id)

		if (! check_user.length) {
			res.status(404).json({
				code: '404',
				status: 'Not Found',
				message: 'User tidak ditemukan'
			})
		}
		else {
			try {
				await m_users.db_delete_user(id)
				res.json({
					code: '200',
					status: 'Success',
					message: 'User berhasil dihapus'
				})
			} catch (error) {
				res.status(500).json({
					code: '500',
					status: 'Server Error',
					error
				})
			}
		}
	} catch (error) {
		res.status(500).json({
			code: '500',
			status: 'Server Error',
			error
		})
	}
}

module.exports = {get_users, post_user, patch_user, delete_user}