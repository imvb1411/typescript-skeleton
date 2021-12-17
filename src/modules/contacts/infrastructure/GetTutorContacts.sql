	-- Listado de contactos
	-- Cursos
	select distinct c.codigo, p.cod_par, concat(c.descrip, ' ',p.descrip ) as nombre, 6 as tipo  
	from cursos c 
		inner join paralelos p 
			on (p.cod_par = ?
				and p.estado = 1)
	where
		c.codigo = ?
	union all
	-- Profesores
	select distinct p.codprof as codigo, pcm.codpar as cod_par, concat(p.apepro,' ',p.nompro) as nombre, 3 as tipo
	from prof_cur_mat pcm 
		inner join profe p 
			on (p.codprof = pcm.prof
				and p.estado = 'activo')
	where
		pcm.codpar = ?
		and pcm.codcur = ?
		and pcm.gestion = year(now())
		and pcm.estado='activo'
	-- Tutores
	union all
	select distinct t.cod_tut as codigo, a.cod_par, concat(t.paterno,' ',t.materno,' ',t.nombres) as nombre, 1 as tipo
	from alumno a 
		inner join alu_tut at 
			on (at.codigo = a.codigo 
				and at.estado = 1
				and at.cod_tut != ?)
		inner join tutor t 
			on (t.cod_tut = at.cod_tut)
	where
		a.cod_par = ?
		and a.cod_cur = ?
		and a.estado = 1
	;