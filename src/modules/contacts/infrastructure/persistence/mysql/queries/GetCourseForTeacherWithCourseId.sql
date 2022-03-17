select distinct codcur as id, concat(cursos.descrip, ' ', paralelos.descrip) as name , 1 as type
from prof_cur_mat  
    inner join cursos on (cursos.cod_cur = prof_cur_mat.codcur) 
    inner join paralelos on (paralelos.estado = 1 and paralelos.cod_par = prof_cur_mat.codpar)
where prof_cur_mat.estado = 'activo' and prof_cur_mat.gestion = year(now()) and prof_cur_mat.prof = ? and prof_cur_mat.codcur = ?;