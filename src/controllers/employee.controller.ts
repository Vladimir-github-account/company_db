import { Response }      from 'express';
import sequelize         from '../db/sequelize';
import { QueryTypes }    from 'sequelize';
import { ITokenRequest } from '../types';
import Employee          from '../db/models/Employee';

function getEmployeesQuery(id: number) {
	return `
    WITH RECURSIVE empdata AS ((SELECT id, name, position, "bossId", 1 AS level
                                FROM "Employees"
                                WHERE id = ${id})
                               UNION ALL
                               (SELECT this.id,
                                       this.name,
                                       this.position,
                                       this."bossId",
                                       prior.level + 1
                                FROM empdata prior
              INNER JOIN "Employees" this
                                ON this."bossId" = prior.id))
    SELECT e.id, e.name, e.position, e."bossId", e.level
    FROM empdata e
    ORDER BY e.level;
	`;
}

export const getEmployees = async (req: ITokenRequest, res: Response) => {
	try {
		const { id } = req.user;
		const employees = await sequelize.query(getEmployeesQuery(id), { type: QueryTypes.SELECT });
		res.status(200).json(employees);
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: 'Bad Request' });
	}
};

export const changeEmployeeBoss = async (req: ITokenRequest, res: Response) => {
	try {
		const { employeeId, bossId } = req.body;
		const { id } = req.user;
		const employees = await sequelize.query(getEmployeesQuery(id), { type: QueryTypes.SELECT });
		const checkPermission = employees.filter((el: any) => [employeeId, bossId].indexOf(el.id) > -1).length > 1;
		if (checkPermission) {
			const [updatedRowsCount, updatedRows] = await Employee.update({ bossId }, {
				where: { id: employeeId },
				returning: true
			});
			return updatedRowsCount
				? res.status(200).json({ message: 'Successfully changed' })
				: res.status(400).json({ error: 'Change employee\'s boss error' });
		}
		return res.status(403).json({ error: 'Forbidden' });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: 'Bad Request' });
	}
};