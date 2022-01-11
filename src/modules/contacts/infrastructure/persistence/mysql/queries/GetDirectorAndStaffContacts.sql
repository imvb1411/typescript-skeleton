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
SELECT DISTINCT p.cod_pro as codigo, pcm.codpar as cod_par, concat(p.paterno,' ',p.materno,' ',p.nombres) as nombre, 3 as tipo
FROM profesores p
	INNER JOIN prof_cur_mat pcm
    	ON (pcm.prof = p.cod_pro)
	INNER JOIN prof_colegio as c
		ON (c.cod_pro = p.cod_pro
			AND c.cod_col = ?)
WHERE
	p.estado = 'activo'
UNION ALL
-- Listado de cursos
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
-- GRUPO DEL COLEGIO
SELECT DISTINCT a.cod_col as codigo, 0 as codpar, a.nombre, 7 as tipo
FROM colegios as a
WHERE a.cod_col = ?
	AND a.estado = 1
ORDER BY tipo, codigo;
