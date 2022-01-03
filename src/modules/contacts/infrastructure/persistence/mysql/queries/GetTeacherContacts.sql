-- LISTADO DE CURSOS
SELECT DISTINCT a.codcur as codigo, a.codpar, concat(b.descrip, ' ',c.descrip ) as nombre, 6 as tipo  
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
	 INNER JOIN alumnos as b
     ON (b.estado = 1
 		and b.cod_cur = a.codcur
         and b.cod_par = a.codpar)
	INNER JOIN tutor_alumno as c
	ON (c.estado = 1
 		AND c.codigo = b.codigo)
	INNER JOIN tutorES as d
 	ON (d.cod_tut = c.cod_tut)
where a.prof= ?
	and a.estado='activo'
ORDER BY tipo, codigo;