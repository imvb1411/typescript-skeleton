-- LISTADO DE ALUMNOS
SELECT DISTINCT alumnos.codigo as codigo, alumnos.cod_par as cod_par, concat(alumnos.paterno,' ',alumnos.materno,' ',alumnos.nombres) as nombre, 2 as tipo
FROM alumnos
WHERE
	alumnos.estado = 1
	and alumnos.cod_col = ?
UNION ALL
-- LISTADO DE TUTORES
SELECT DISTINCT a.cod_tut as codigo, c.cod_par, concat(a.paterno,' ',a.materno,' ',a.nombres) as nombre, 1 as tipo
FROM tutores as a 
	INNER JOIN tutor_alumno as b
		ON (b.cod_tut = a.cod_tut
			AND b.estado = 1)
	INNER JOIN alumnos as c
		ON (c.codigo = b.codigo
			AND c.estado = 1
			AND c.cod_col = ?)
UNION ALL
-- LISTADO DE PROFESORES
SELECT DISTINCT p.cod_pro as codigo, 0 as cod_par, concat(p.paterno,' ',p.materno,' ',p.nombres) as nombre, 3 as tipo
FROM profesores p
	INNER JOIN prof_cur_mat pcm
    	ON (pcm.prof = p.cod_pro)
	INNER JOIN prof_colegio as c
		ON (c.cod_pro = p.cod_pro
			AND c.cod_col = ?)
WHERE
	p.estado = 1
UNION ALL
-- Listado de cursos con los alumnos
SELECT DISTINCT c.cod_cur as codigo, p.cod_par, concat(c.descrip, ' ',p.descrip ) as nombre, 6 as tipo  
FROM alumnos as a
	INNER JOIN cursos as c
		ON (c.cod_cur = a.cod_cur)
	INNER JOIN paralelos p 
		ON (p.cod_par = a.cod_par
			AND p.estado = 1)
WHERE
	a.estado = 1
	AND a.cod_col = ?
UNION ALL
-- LISTADO DE CURSOS CON TUTORES
SELECT DISTINCT a.codcur as codigo, a.codpar, concat(b.descrip, ' ',c.descrip, '-Tutores') as nombre, 7 as tipo  
FROM prof_cur_mat as a
    INNER JOIN cursos as b
        on (b.cod_cur = a.codcur)
    INNER JOIN paralelos as c
    ON (c.estado = 1
        AND c.cod_par = a.codpar)
WHERE a.cod_col= ? AND a.estado='activo'
UNION ALL
-- LISTADO DE PERSONAL
SELECT DISTINCT adm.cod_adm as codigo, 0 as cod_par, adm.nombre, 5 as tipo
FROM adm
WHERE adm.estado = 1 and adm.colegio = ? and adm.cod_adm <> ?
UNION ALL 
-- GRUPO DEL COLEGIO
SELECT DISTINCT a.cod_col as codigo, 0 as codpar, a.nombre, 8 as tipo
FROM colegios as a
WHERE a.cod_col = ?
	AND a.estado = 1
ORDER BY tipo, codigo;
