import { Response }      from 'express';
import sequelize         from '../db/sequelize';
import { QueryTypes }    from 'sequelize';
import { ITokenRequest } from '../types';

export const getEmployees = async (req: ITokenRequest, res: Response) => {
	try {
		const { id } = req.user;
		const employees = await sequelize.query(`
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
		`, { type: QueryTypes.SELECT });
		res.status(200).json(employees);
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: 'Bad Request' });
	}
};