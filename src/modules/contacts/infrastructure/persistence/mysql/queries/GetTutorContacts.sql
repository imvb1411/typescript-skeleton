SELECT DISTINCT t.codigo, t.cod_par, t.nombre, t.tipo
FROM (
	-- Estudiantes
	SELECT DISTINCT alumnos.codigo as codigo, alumnos.cod_par, concat(alumnos.paterno,' ',alumnos.materno,' ',alumnos.nombres) as nombre, 2 as tipo, alumnos.cod_cur, alumnos.cod_col
	FROM tutor_alumno
		INNER JOIN alumnos
			ON (alumnos.codigo = tutor_alumno.codigo
				AND alumnos.estado = 1)
	WHERE
		tutor_alumno.estado = 1
	UNION ALL
	-- Cursos con el profesor
	SELECT DISTINCT c.cod_cur as codigo, p.cod_par, concat(c.descrip, ' ',p.descrip,'-Tutores') as nombre, 7 as tipo, c.cod_cur, 0 as cod_col 
	FROM cursos c 
		INNER JOIN paralelos p 
			ON (p.estado = 1)
	UNION ALL
	-- Profesores
	SELECT DISTINCT p.cod_pro as codigo, pcm.codpar as cod_par, concat(p.paterno,' ',p.materno,' ',p.nombres) as nombre, 3 as tipo, pcm.codcur as cod_cur, c.cod_col
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
		a.estado = 1
	union all
	-- Administracion
	SELECT DISTINCT cod_adm as codigo, 0 as cod_par, nombre, case when cargo in (1,2) then 4 else 5 end as tipo, 0 as cod_cur, colegio as cod_col
	FROM adm
	WHERE adm.estado = 1
	) as t
	inner join alumnos as a
		on ( ((t.tipo not in (4,5) and a.cod_cur = t.cod_cur) or (t.tipo in (4,5)))
			and ((t.tipo = 2 and a.codigo = t.codigo) or (t.tipo <> 2))
			and ((t.tipo in (3,4,5)) or (t.tipo <> 3 and a.cod_par = t.cod_par))
			and (a.cod_col = t.cod_col or t.cod_col = 0))
	inner join tutor_alumno as b
		on (b.codigo = a.codigo
			and b.cod_tut = ?
            and b.estado = 1
            and ((t.tipo = 1 and t.codigo <> b.cod_tut) or (t.tipo > 1)))
ORDER BY t.tipo, t.codigo;