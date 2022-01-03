-- LISTADO DE CURSOS
SELECT DISTINCT c.cod_cur as codigo, p.cod_par, concat(c.descrip, ' ',p.descrip ) as nombre, 6 as tipo  
FROM alumnos as a
	INNER JOIN cursos as c
		ON (c.cod_cur = a.cod_cur)
	INNER JOIN paralelos p 
		ON (p.cod_par = a.cod_par
			AND p.estado = 1)
WHERE
	a.estado = 1
    AND a.codigo = ?
UNION ALL
-- LISTADO DE PROFESORES
SELECT DISTINCT p.cod_pro as codigo, pcm.codpar as cod_par, concat(p.paterno,' ',p.materno,' ',p.nombres) as nombre, 3 as tipo
FROM profesores p
	INNER JOIN prof_cur_mat pcm
        ON (pcm.prof = p.cod_pro)
    INNER JOIN alumnos as a
        ON (a.cod_cur = pcm.cod_cur
		    AND a.codigo = ?)
WHERE
	p.estado = 'activo'
-- LISTADO DE TUTORES
SELECT DISTINCT a.cod_tut as codigo, c.cod_par, concat(a.paterno,' ',a.materno,' ',a.nombres) as nombre, 1 as tipo
FROM tutores as a 
	INNER JOIN tutor_alumno as b
		ON (b.cod_tut = a.cod_tut
			AND b.estado = 1)
	INNER JOIN alumnos as c
		ON (c.codigo = b.codigo
			AND c.estado = 1
            AND c.codigo = ?)
ORDER BY tipo, codigo;