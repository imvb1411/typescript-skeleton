-- LISTADO DE CURSOS
SELECT DISTINCT cursos.cod_cur as codigo, paralelos.cod_par, concat(cursos.descrip, ' ',paralelos.descrip ) as nombre, 6 as tipo  
FROM alumnos
	INNER JOIN cursos
		ON (cursos.cod_cur = alumnos.cod_cur)
	INNER JOIN paralelos 
		ON (paralelos.cod_par = alumnos.cod_par
			AND paralelos.estado = 1)
WHERE
	alumnos.estado = 1
    AND alumnos.codigo = ?
UNION ALL
-- LISTADO DE PROFESORES
select DISTINCT profesores.cod_pro as codigo, prof_cur_mat.codpar as cod_par, concat(profesores.paterno,' ',profesores.materno,' ',profesores.nombres) as nombre, 3 as tipo
from prof_cur_mat 
	inner join profesores
		on (profesores.cod_pro = prof_cur_mat.prof
			and profesores.estado = 1)
	inner join alumnos
		on (alumnos.cod_cur = prof_cur_mat.codcur
			and alumnos.cod_par = prof_cur_mat.codpar
			and alumnos.cod_col = prof_cur_mat.cod_col
            and alumnos.estado = 1
            and alumnos.codigo = ?)
where 
	prof_cur_mat.estado = 'activo'
    and prof_cur_mat.gestion = year(now())
UNION ALL
-- LISTADO DE TUTORES
SELECT DISTINCT tutores.cod_tut as codigo, alumnos.cod_par, concat(tutores.paterno,' ',tutores.materno,' ',tutores.nombres) as nombre, 1 as tipo
FROM tutores 
	INNER JOIN tutor_alumno
		ON (tutor_alumno.cod_tut = tutores.cod_tut
			AND tutor_alumno.estado = 1)
	INNER JOIN alumnos
		ON (alumnos.codigo = tutor_alumno.codigo
			AND alumnos.estado = 1
            AND alumnos.codigo = ?)
-- LISTADO DE COMPAÑEROS
UNION ALL
select DISTINCT compañeros.codigo as codigo, compañeros.cod_par as cod_par, concat(compañeros.paterno,' ',compañeros.materno,' ',compañeros.nombres) as nombre, 2 as tipo
from alumnos
	inner join alumnos as compañeros
		on (compañeros.cod_cur = alumnos.cod_cur
			and compañeros.cod_par = alumnos.cod_par
            and compañeros.cod_col = alumnos.cod_col
			and compañeros.estado = 1)
where 
	alumnos.estado = 1
	and alumnos.codigo = ?
-- ADMINISTRACION
UNION ALL
SELECT DISTINCT cod_adm as codigo, 0 as cod_par, nombre, case when cargo in (1,2) then 4 else 5 end as tipo
FROM adm
	INNER JOIN alumnos ON (alumnos.estado = 1 and alumnos.cod_col = adm.colegio and alumnos.codigo = ?)
WHERE adm.estado = 1
ORDER BY tipo, codigo;
