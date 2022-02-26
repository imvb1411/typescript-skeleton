select distinct alumnos.cod_cur as id, concat(cursos.descrip, ' ', paralelos.descrip) as name
from tutores
    inner join tutor_alumno on (tutor_alumno.estado = 1 and tutor_alumno.cod_tut = tutores.cod_tut)
    inner join alumnos on (alumnos.codigo = tutor_alumno.codigo and alumnos.estado = 1)
    inner join cursos on (cursos.cod_cur = alumnos.cod_cur)
    inner join paralelos on (paralelos.estado = 1 and paralelos.cod_par = alumnos.cod_par)
where tutores.cod_tut = ?;