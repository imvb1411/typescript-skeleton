-- LISTADO DE CURSOS
SELECT DISTINCT a.codcur as codigo, a.codpar, concat(b.descrip, ' ',c.descrip) as nombre, 6 as tipo  
FROM prof_cur_mat as a
    INNER JOIN cursos as b
        on (b.cod_cur = a.codcur)
    INNER JOIN paralelos as c
    ON (c.estado = 1
        AND c.cod_par = a.codpar)
WHERE a.prof= ? AND a.estado='activo'
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
SELECT DISTINCT d.cod_tut as codigo, b.cod_par, CONCAT(d.paterno,' ',d.materno,' ',d.nombres) as nombre, 1 as tipo
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
ORDER BY tipo, codigo;
-- GRUPO DE PROFESORES Y EL DIRECTOR DEL COLEGIO
SELECT DISTINCT a.cod_col as codigo, 0 as codpar, b.nombre, 7 as tipo
FROM prof_colegio as a
	INNER JOIN colegios as b
    ON (b.cod_col = a.cod_col
		AND b.estado = 1)
WHERE a.cod_pro = ?
	AND a.estado = 1;
