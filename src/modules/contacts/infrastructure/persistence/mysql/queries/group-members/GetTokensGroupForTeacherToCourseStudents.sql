SELECT DISTINCT a.id, a.userId, a.userType, concat(c.paterno,' ',c.materno,' ',c.nombres) as name, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
FROM UserToken as a
    INNER JOIN tutor_alumno as b
		ON (b.cod_tut = a.userId
			AND b.estado = 1)
	INNER JOIN alumnos as c
		ON (c.codigo = b.codigo
			and c.cod_cur = ?)
	INNER JOIN (SELECT y.cod_par, y.cod_col 
				FROM tutor_alumno x 
					INNER JOIN alumnos y 
					ON (y.codigo = x.codigo
                        and y.cod_cur = ?) 
				WHERE x.estado = 1) AS d
		ON (d.cod_par = c.cod_par
			and d.cod_col = c.cod_col)
WHERE
	a.state = 1
	AND a.UserType = 2 -- Estudiantes
UNION ALL
SELECT DISTINCT a.id, a.userId, a.userType, concat(e.paterno,' ',e.materno,' ',e.nombres) as name, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
FROM UserToken as a
	INNER JOIN prof_cur_mat as b 
		ON (b.prof = a.UserId
			AND b.estado='activo'
            AND b.prof <> ?)
	INNER JOIN (SELECT y.cod_cur, y.cod_par, y.cod_col
				FROM tutor_alumno x 
					INNER JOIN alumnos y 
					ON (y.codigo = x.codigo
                        AND y.cod_cur = ?) 
				WHERE x.estado = 1) AS c
		ON (c.cod_cur = b.codcur
			AND c.cod_par = b.codpar)
	INNER JOIN prof_colegio as d
		ON (d.cod_pro = b.prof
			AND d.cod_col = c.cod_col)
	INNER JOIN profesores as e
		ON (e.cod_pro = b.prof 
			AND e.estado = 1)
WHERE a.state=1
	AND a.UserType = 3; -- Profesores