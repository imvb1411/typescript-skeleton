SELECT DISTINCT a.id, a.userId, a.userType, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
FROM UserToken as a
    INNER JOIN alumnos as b
    ON (b.codigo = a.UserId)
	INNER JOIN alumnos as c
    ON (c.cod_cur = b.cod_cur
        AND c.cod_par = b.cod_par
        AND c.cod_col = b.cod_col
        AND c.codigo = ?)
WHERE
	a.state = 1
    AND a.UserType = 2 -- Estudiantes
UNION ALL
SELECT DISTINCT a.id, a.userId, a.userType, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
FROM UserToken as a
	INNER JOIN prof_cur_mat as b 
	ON (b.prof = a.UserId
		AND b.estado='activo')
	INNER JOIN alumnos as c
	ON (c.cod_cur = b.cod_cur
		AND c.cod_par = b.cod_par
        AND c.codigo = ?)
    INNER JOIN prof_colegio as d
	ON (d.cod_pro = b.prof
		AND d.cod_col = c.cod_col)
WHERE a.state=1
	AND a.UserType = 3; -- Profesores