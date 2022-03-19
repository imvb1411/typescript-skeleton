SELECT DISTINCT UserToken.id, UserToken.userId, UserToken.userType
	, concat(alumnos.paterno,' ',alumnos.materno,' ',alumnos.nombres) as name, UserToken.firebaseToken, UserToken.state
    , date_format(UserToken.createdAt, '%Y-%m-%d %T') as createdAt, UserToken.updatedAt
FROM UserToken
    INNER JOIN alumnos
		ON (alumnos.codigo = UserToken.UserId
			AND alumnos.estado = 1
            AND alumnos.cod_cur = ?
            AND alumnos.cod_col = ?)
WHERE
	UserToken.state = 1
	AND UserToken.UserType = 2 -- Estudiantes
UNION ALL
SELECT DISTINCT UserToken.id, UserToken.userId, UserToken.userType
	, concat(profesores.paterno,' ',profesores.materno,' ',profesores.nombres) as name, UserToken.firebaseToken, UserToken.state
    , date_format(UserToken.createdAt, '%Y-%m-%d %T') as createdAt, UserToken.updatedAt
FROM UserToken
	INNER JOIN prof_cur_mat as colegas
		ON (colegas.prof = UserToken.UserId
			AND colegas.estado = 'activo'
            AND colegas.codcur = ?
            AND colegas.cod_col = ?)
    INNER JOIN profesores
        ON (profesores.cod_pro = colegas.prof
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