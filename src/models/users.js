const db_pool = require('../config/database')
const now_datetime = require('../time')

const db_get_users = () => {
	const sql_query = `SELECT * FROM users WHERE deleted_at IS NULL ORDER BY nama ASC`
	return db_pool.execute(sql_query)
}

const db_insert_user = (body) => {
	const sql_query = `INSERT INTO users (nama, email) VALUES ('${body.nama}', '${body.email}')`
	return db_pool.execute(sql_query)
}

const db_check_users_post = (email) => {
	const sql_query = `SELECT email FROM users WHERE deleted_at IS NULL AND email = '${email}'`
	return db_pool.execute(sql_query)
}

const db_update_user = (id, body) => {
	const sql_query = `UPDATE users SET nama = '${body.nama}', email = '${body.email}' WHERE id = ${id}`
	return db_pool.execute(sql_query)
}

const db_check_user = (id) => {
	const sql_query = `SELECT id FROM users WHERE deleted_at IS NULL AND id = ${id}`
	return db_pool.execute(sql_query)
}

const db_check_users_patch = (id, email) => {
	const sql_query = `SELECT email FROM users WHERE deleted_at IS NULL AND id != ${id} AND email = '${email}'`
	return db_pool.execute(sql_query)
}

const db_delete_user = (id) => {
	const sql_query = `UPDATE users SET deleted_at = '${now_datetime()}' WHERE id = ${id}`
	return db_pool.execute(sql_query)
}

module.exports = {db_get_users, db_insert_user, db_check_users_post, db_update_user, db_check_user, db_check_users_patch, db_delete_user}