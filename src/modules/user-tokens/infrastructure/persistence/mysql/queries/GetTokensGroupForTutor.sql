SELECT DISTINCT a.id, a.userId, a.userType, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
FROM UserToken as a
    INNER JOIN tutor_alumno as b
		ON (b.cod_tut = a.userId
			AND b.estado = 1
			AND b.cod_tut <> ?)
	INNER JOIN alumnos as c
		ON (c.codigo = b.codigo
			and c.cod_cur = ?)
	INNER JOIN (SELECT y.cod_par, y.cod_col 
				FROM tutor_alumno x 
					INNER JOIN alumnos y 
					ON (y.codigo = x.codigo) 
				WHERE x.cod_tut = ?
				AND x.estado = 1) AS d
		ON (d.cod_par = c.cod_par
			and d.cod_col = c.cod_col)
WHERE
	a.state = 1
	AND a.UserType = 1 -- Tutores
UNION ALL
SELECT DISTINCT a.id, a.userId, a.userType, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
FROM UserToken as a
	INNER JOIN prof_cur_mat as b 
		ON (b.prof = a.UserId
			AND b.estado='activo')
	INNER JOIN (SELECT y.cod_par, y.cod_col
				FROM tutor_alumno x 
					INNER JOIN alumnos y 
					ON (y.codigo = x.codigo) 
				WHERE x.cod_tut = ?
				AND x.estado = 1) AS b
		ON (a.cod_cur = b.cod_cur
			AND a.cod_par = b.cod_par)
	INNER JOIN prof_colegio as c
		ON (c.cod_pro = b.prof
			AND c.cod_col = d.cod_col)
WHERE a.state=1
	AND a.UserType = 3; -- Profesores
