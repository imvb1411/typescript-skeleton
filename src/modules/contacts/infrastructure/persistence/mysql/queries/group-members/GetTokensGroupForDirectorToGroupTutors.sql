SELECT DISTINCT UserToken.id, UserToken.userId, UserToken.userType, concat(tutores.paterno,' ',tutores.materno,' ',tutores.nombres) as name
, UserToken.firebaseToken, UserToken.state, date_format(UserToken.createdAt, '%Y-%m-%d %T') as createdAt, UserToken.updatedAt
FROM UserToken
    INNER JOIN tutor_alumno
		ON (tutor_alumno.cod_tut = UserToken.userId
			AND tutor_alumno.estado = 1)
	INNER JOIN alumnos
		ON (alumnos.codigo = tutor_alumno.codigo
			AND alumnos.cod_cur = ?
            AND alumnos.cod_col = ?)
	INNER JOIN tutores
		ON (tutores.cod_tut = tutor_alumno.cod_tut)
WHERE
	UserToken.state = 1
	AND UserToken.UserType = 1 -- Tutores
UNION ALL
SELECT DISTINCT UserToken.id, UserToken.userId, UserToken.userType
	, concat(profesores.paterno,' ',profesores.materno,' ',profesores.nombres) as name, UserToken.firebaseToken, UserToken.state
	, date_format(UserToken.createdAt, '%Y-%m-%d %T') as createdAt, UserToken.updatedAt
FROM UserToken
	INNER JOIN prof_cur_mat
		ON (prof_cur_mat.prof = UserToken.UserId
			AND prof_cur_mat.estado='activo'
            AND prof_cur_mat.codcur = ?
            AND prof_cur_mat.cod_col = ?)
	INNER JOIN profesores
		ON (profesores.cod_pro = prof_cur_mat.prof 
			AND profesores.estado = 1)
WHERE UserToken.state=1
	AND UserToken.UserType = 3; -- Profesores
UNION ALL
SELECT DISTINCT a.id, a.userId, a.userType, c.nombre as name, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
FROM UserToken as a
    INNER JOIN adm as c 
        ON (c.cod_adm = a.UserId
            AND c.estado = 1
            AND c.colegio = ?)
WHERE a.state=1
    AND a.UserId <> ?
	AND a.UserType in (4, 5); -- Director y personal