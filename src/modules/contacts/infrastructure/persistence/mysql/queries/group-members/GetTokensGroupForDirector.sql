SELECT DISTINCT a.id, a.userId, a.userType, concat(c.paterno,' ',c.materno,' ',c.nombres) as name, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
FROM UserToken as a
	INNER JOIN prof_colegio as b
		ON (b.cod_pro = a.UserId
			AND b.cod_col = ?)
    INNER JOIN profesores as c 
        ON (c.cod_pro = b.cod_pro
            AND c.estado = 1)
WHERE a.state=1
	AND a.UserType = 3 -- Profesores
UNION ALL
SELECT DISTINCT a.id, a.userId, a.userType, concat(c.paterno,' ',c.materno,' ',c.nombres) as name, a.firebaseToken, a.state, date_format(a.createdAt, '%Y-%m-%d %T') as createdAt, a.updatedAt
FROM UserToken as a
    INNER JOIN dir_colegio as b 
        ON (b.cod_dir = a.UserId
            AND b.estado = 1
            AND b.cod_dir <> ?
            AND b.cod_col = ?)   
    INNER JOIN directores as c 
        ON (c.cod_dir = b.cod_dir
            AND c.estado = 1)
WHERE a.state=1
	AND a.UserType = 4; -- Director