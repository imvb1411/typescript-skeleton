SELECT DISTINCT UserToken.id, UserToken.userId, UserToken.userType
	, concat(alumnos.paterno,' ',alumnos.materno,' ',alumnos.nombres) as name, UserToken.firebaseToken, UserToken.state
    , date_format(UserToken.createdAt, '%Y-%m-%d %T') as createdAt, UserToken.updatedAt
FROM UserToken
    INNER JOIN alumnos
		ON (alumnos.codigo = UserToken.UserId
			AND alumnos.estado = 1)
	INNER JOIN prof_cur_mat
		ON (prof_cur_mat.codcur = alumnos.cod_cur
			AND prof_cur_mat.codpar = alumnos.cod_par
            AND prof_cur_mat.cod_col = alumnos.cod_col
            AND prof_cur_mat.estado = 'activo'
            AND prof_cur_mat.prof = ?)
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
			AND colegas.estado = 'activo')
	INNER JOIN prof_cur_mat
		ON (prof_cur_mat.codcur = colegas.codcur
			AND prof_cur_mat.codpar = colegas.codpar
            AND prof_cur_mat.cod_col = colegas.cod_col
            AND prof_cur_mat.estado = 'activo'
            AND prof_cur_mat.prof = ?)
    INNER JOIN profesores
        ON (profesores.cod_pro = colegas.prof
			AND profesores.estado = 1)
WHERE UserToken.state=1
	AND UserToken.UserType = 3
    AND UserToken.UserId <> ?; -- Profesores
UNION ALL
SELECT DISTINCT UserToken.id, UserToken.userId, UserToken.userType, '' as name
	, UserToken.firebaseToken, UserToken.state, date_format(UserToken.createdAt, '%Y-%m-%d %T') as createdAt, UserToken.updatedAt
FROM UserToken
	INNER JOIN adm
		ON (adm.cod_adm = UserToken.UserId
			AND adm.estado = 1)
	INNER JOIN prof_cur_mat
		ON (prof_cur_mat.cod_col = adm.colegio
			AND prof_cur_mat.estado = 'activo'
			AND prof_cur_mat.prof = ?) 
WHERE UserToken.state=1
	AND UserToken.UserType = 4; -- Directores