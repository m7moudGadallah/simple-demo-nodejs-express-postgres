module.exports = (database) => {
    const getAllUsers = async (req, res) => {
        try {
            const users = await database.query(
                'select * from users order by id asc'
            );
            res.status(200).json({
                success: true,
                message: 'Data found',
                payload: {
                    length: users.rows.length,
                    data: users.rows,
                },
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
                payload: null,
            });
        }
    };

    const getUser = async (req, res) => {
        try {
            const user = await database.query(
                `select * from users where id = ${req.params.id}`
            );
            res.status(200).json({
                success: true,
                message: 'Data found',
                payload: {
                    length: 1,
                    data: user.rows,
                },
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
                payload: null,
            });
        }
    };

    const createUser = async (req, res) => {
        try {
            const { name, email } = req.body;

            const user = await database.query({
                text: `insert into users(name, email) values($1, $2) returning *`,
                values: [name, email],
            });
            res.status(201).json({
                success: true,
                message: 'Data found',
                payload: {
                    length: 1,
                    data: user.rows,
                },
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
                payload: null,
            });
        }
    };

    const updateUser = async (req, res) => {
        try {
            const { name, email } = req.body;

            const user = await database.query({
                text: `update users set name = $1, email = $2 where id = $3 returning *`,
                values: [name, email, req.params.id],
            });
            res.status(201).json({
                success: true,
                message: 'Data found',
                payload: {
                    length: 1,
                    data: user.rows,
                },
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
                payload: null,
            });
        }
    };

    const deleteUser = async (req, res) => {
        try {
            await database.query({
                text: `delete from users where id = $1`,
                values: [req.params.id],
            });
            res.status(201).json({
                success: true,
                message: 'Data found',
                payload: {
                    data: null,
                },
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
                payload: null,
            });
        }
    };

    return {
        getAllUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
    };
};
