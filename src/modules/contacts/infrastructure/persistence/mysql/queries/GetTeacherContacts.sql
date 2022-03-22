-- LISTADO DE CURSOS
SELECT DISTINCT a.codcur as codigo, a.codpar, concat(b.descrip, ' ',c.descrip) as nombre, 6 as tipo  
FROM prof_cur_mat as a
    INNER JOIN cursos as b
        on (b.cod_cur = a.codcur)
    INNER JOIN paralelos as c
    ON (c.estado = 1
        AND c.cod_par = a.codpar)
WHERE a.prof= ? AND a.estado='activo'
UNION ALL
-- LISTADO DE CURSOS CON TUTORES
SELECT DISTINCT a.codcur as codigo, a.codpar, concat(b.descrip, ' ',c.descrip, '-Tutores') as nombre, 7 as tipo  
FROM prof_cur_mat as a
    INNER JOIN cursos as b
        on (b.cod_cur = a.codcur)
    INNER JOIN paralelos as c
    ON (c.estado = 1
        AND c.cod_par = a.codpar)
WHERE a.prof= ? AND a.estado='activo'
UNION ALL
-- LISTADO DE TUTORES
SELECT DISTINCT d.cod_tut as codigo, a.codpar, CONCAT(e.paterno,' ',e.materno,' ',e.nombres) as nombre, 1 as tipo
FROM prof_cur_mat as a
	INNER JOIN prof_colegio as b
		ON (b.cod_pro = a.prof
			AND b.estado = 1)
	INNER JOIN alumnos as c
		ON (c.estado = 1
			AND c.cod_cur = a.codcur
			AND c.cod_par = a.codpar
			AND c.cod_col = b.cod_col)
	INNER JOIN tutor_alumno as d
		ON (d.estado = 1
			AND d.codigo = c.codigo)
	INNER JOIN tutores as e
 		ON (e.cod_tut = d.cod_tut)
WHERE a.prof= ?
	AND a.estado='activo'
UNION ALL 
-- LISTADO DE ALUMNOS
SELECT DISTINCT alumnos.codigo as codigo, alumnos.cod_par as cod_par, concat(alumnos.paterno,' ',alumnos.materno,' ',alumnos.nombres) as nombre, 2 as tipo
FROM alumnos
	INNER JOIN prof_cur_mat
		ON (prof_cur_mat.codcur = alumnos.cod_cur
			AND prof_cur_mat.codpar = alumnos.cod_par
            AND prof_cur_mat.cod_col = alumnos.cod_col
            AND prof_cur_mat.estado = 'activo'
            AND prof_cur_mat.prof = ?)
WHERE
	alumnos.estado = 1
UNION ALL
-- ADMINISTRACION
SELECT DISTINCT cod_adm as codigo, 0 as cod_par, nombre, case when cargo in (1,2) then 4 else 5 end as tipo
FROM adm
	INNER JOIN prof_cur_mat ON (prof_cur_mat.cod_col = adm.colegio and prof_cur_mat.estado = 'activo' and prof_cur_mat.prof = ?)
WHERE adm.estado = 1
UNION ALL
-- GRUPO DE PROFESORES Y EL DIRECTOR DEL COLEGIO
SELECT DISTINCT a.cod_col as codigo, 0 as codpar, b.nombre, 8 as tipo
FROM prof_colegio as a
	INNER JOIN colegios as b
    ON (b.cod_col = a.cod_col
		AND b.estado = 1)
WHERE a.cod_pro = ?
	AND a.estado = 1
ORDER BY tipo, codigo;

