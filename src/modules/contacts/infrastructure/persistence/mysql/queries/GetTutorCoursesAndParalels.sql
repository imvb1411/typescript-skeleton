SELECT a.cod_cur, a.cod_par 
FROM tutor_alumno at 
    INNER JOIN alumnos a 
    ON (at.codigo = a.codigo) 
WHERE at.cod_tut = ?
AND at.estado = 1;