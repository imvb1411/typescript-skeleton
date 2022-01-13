-- Cursos con el profesor
SELECT DISTINCT c.cod_cur as codigo, p.cod_par, concat(c.descrip, ' ',p.descrip,'-Tutores') as nombre, 7 as tipo  
FROM cursos c 
	INNER JOIN paralelos p 
		ON (p.cod_par = ?
			AND p.estado = 1)
WHERE
	c.cod_cur = ?
UNION ALL
-- Profesores
SELECT DISTINCT p.cod_pro as codigo, pcm.codpar as cod_par, concat(p.paterno,' ',p.materno,' ',p.nombres) as nombre, 3 as tipo
FROM prof_cur_mat pcm 
	INNER JOIN profesores p 
		ON (p.cod_pro = pcm.prof
			AND p.estado = 'activo')
	INNER JOIN prof_colegio as c 
		ON (c.cod_pro = pcm.prof
			AND c.cod_col = ?)
WHERE
	pcm.codpar = ?
	AND pcm.codcur = ?
	AND pcm.gestion = year(now())
	AND pcm.estado='activo'
-- Tutores
UNION ALL
SELECT DISTINCT t.cod_tut as codigo, a.cod_par, concat(t.paterno,' ',t.materno,' ',t.nombres) as nombre, 1 as tipo
FROM alumnos a 
	INNER JOIN tutor_alumno at 
		ON (at.codigo = a.codigo 
			AND at.estado = 1
			AND at.cod_tut != ?)
	INNER JOIN tutores t 
		ON (t.cod_tut = at.cod_tut)
WHERE
	a.cod_par = ?
	AND a.cod_cur = ?
	AND a.cod_col = ?
	AND a.estado = 1
ORDER BY tipo, codigo;