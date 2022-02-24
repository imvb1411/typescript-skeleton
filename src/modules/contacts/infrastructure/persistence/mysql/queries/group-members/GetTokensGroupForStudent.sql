SELECT DISTINCT a.id, a.userId, a.userType, concat(b.paterno,' ',b.materno,' ',b.nombres) as name, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
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
    AND a.userId <> ?
    AND a.UserType = 2 -- Estudiantes
UNION ALL
SELECT DISTINCT a.id, a.userId, a.userType, concat(profesores.paterno,' ',profesores.materno,' ',profesores.nombres) as name, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
FROM UserToken as a
	INNER JOIN prof_cur_mat
	ON (prof_cur_mat.prof = a.UserId
		AND prof_cur_mat.estado='activo')
	INNER JOIN alumnos as c
	ON (c.cod_cur = prof_cur_mat.codcur
		AND c.cod_par = prof_cur_mat.codpar
        AND c.cod_col = prof_cur_mat.cod_col
        AND c.codigo = ?)
	INNER JOIN profesores
		ON (profesores.cod_pro = prof_cur_mat.prof
			AND profesores.estado = 1)
WHERE a.state=1
	AND a.UserType = 3; -- Profesores