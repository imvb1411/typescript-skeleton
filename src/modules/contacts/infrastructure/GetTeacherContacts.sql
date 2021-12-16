SELECT DISTINCT a.codcur, a.codpar, concat(b.descrip, ' ',c.descrip ) as nombre, 1 as tipo  
FROM prof_cur_mat as a
    INNER JOIN cursos as b
        on (b.codigo = a.codcur)
    INNER JOIN paralelos as c
    ON (c.estado = 1
        AND c.cod_par = a.codpar)
WHERE a.prof= ? AND a.estado='activo'
UNION
SELECT distinct d.cod_tut as codigo, b.cod_par, concat(d.paterno,' ',d.materno,' ',d.nombres) as nombre, 3 as tipo
FROM prof_cur_mat as a
	 INNER JOIN alumno as b
     ON (b.estado = 1
 		and b.cod_cur = a.codcur
         and b.cod_par = a.codpar)
	INNER JOIN alu_tut as c
	ON (c.estado = 1
 		AND c.codigo = b.codigo)
	INNER JOIN tutor as d
 	ON (d.cod_tut = c.cod_tut)
where a.prof= ?
	and a.estado='activo';