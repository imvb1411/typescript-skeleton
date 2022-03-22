SELECT DISTINCT UserToken.id, UserToken.userId, UserToken.userType, concat(colegas.paterno,' ',colegas.materno,' ',colegas.nombres) as name
	, UserToken.firebaseToken, UserToken.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, UserToken.updatedAt
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
WHERE UserToken.state=1
	AND UserToken.UserType = 3 -- Profesores
    AND UserToken.UserId <> ?
UNION ALL
SELECT DISTINCT a.id, a.userId, a.userType, '' as name, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
FROM UserToken as a
    INNER JOIN dir_colegio as b 
        ON (b.cod_dir = a.UserId
            AND b.estado = 1
            AND b.cod_col = ?)   
WHERE a.state=1
	AND a.UserType in (4,5); -- Director