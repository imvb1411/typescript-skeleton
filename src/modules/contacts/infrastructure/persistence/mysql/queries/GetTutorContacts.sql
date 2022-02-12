SELECT DISTINCT t.codigo, t.cod_par, t.nombre, t.tipo
FROM (
	-- Cursos con el profesor
	SELECT DISTINCT c.cod_cur as codigo, p.cod_par, concat(c.descrip, ' ',p.descrip,'-Tutores') as nombre, 7 as tipo, c.cod_cur, 0 as cod_col 
	FROM cursos c 
		INNER JOIN paralelos p 
			ON (p.estado = 1)
	UNION ALL
	-- Profesores
	SELECT DISTINCT p.cod_pro as codigo, pcm.codpar as cod_par, concat(p.paterno,' ',p.materno,' ',p.nombres) as nombre, 3 as tipo, pcm.codcur, c.cod_col
	FROM prof_cur_mat pcm 
		INNER JOIN profesores p 
			ON (p.cod_pro = pcm.prof
				AND p.estado = 1)
		INNER JOIN prof_colegio as c 
			ON (c.cod_pro = pcm.prof)
	WHERE
		pcm.gestion = year(now())
		AND pcm.estado='activo'
	-- Tutores
	UNION ALL
	SELECT DISTINCT t.cod_tut as codigo, a.cod_par, concat(t.paterno,' ',t.materno,' ',t.nombres) as nombre, 1 as tipo, a.cod_cur, a.cod_col
	FROM alumnos a 
		INNER JOIN tutor_alumno at 
			ON (at.codigo = a.codigo 
				AND at.estado = 1)
		INNER JOIN tutores t 
			ON (t.cod_tut = at.cod_tut)
	WHERE
		a.estado = 1) as t
	inner join alumnos as a
		on (a.cod_cur = t.cod_cur
			and ((t.tipo = 3) or (t.tipo <> 3 and a.cod_par = t.cod_par))
			and (a.cod_col = t.cod_col or t.cod_col = 0))
	inner join tutor_alumno as b
		on (b.codigo = a.codigo
			and b.cod_tut = ?
            and b.estado = 1
            and ((t.tipo = 1 and t.codigo <> b.cod_tut) or (t.tipo > 1)))
ORDER BY t.tipo, t.codigo;