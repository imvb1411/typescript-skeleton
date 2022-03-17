select distinct alumnos.cod_cur as id, concat(cursos.descrip, ' ', paralelos.descrip) as name , 1 as type
from alumnos  
    inner join cursos on (cursos.cod_cur = alumnos.cod_cur)
    inner join paralelos on (paralelos.estado = 1 and paralelos.cod_par = alumnos.cod_par)
where alumnos.codigo = ? and alumnos.estado = 1 and alumnos.cod_cur = ?;