SELECT DISTINCT UserToken.id, UserToken.userId, UserToken.userType, concat(tutores.paterno,' ',tutores.materno,' ',tutores.nombres) as name
, UserToken.firebaseToken, UserToken.state, date_format(UserToken.createdAt, '%Y-%m-%d %T') as createdAt, UserToken.updatedAt
FROM UserToken
    INNER JOIN tutor_alumno
		ON (tutor_alumno.cod_tut = UserToken.userId
			AND tutor_alumno.estado = 1)
	INNER JOIN alumnos
		ON (alumnos.codigo = tutor_alumno.codigo
			and alumnos.cod_cur = ?)
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
			AND prof_cur_mat.estado='activo')
	INNER JOIN profesores
		ON (profesores.cod_pro = prof_cur_mat.prof 
			AND profesores.estado = 1)
WHERE UserToken.state=1
	AND UserToken.UserType = 3
    AND UserToken.UserId <> ?; -- Profesores