SELECT a.cod_cur, a.cod_par 
FROM alu_tut at 
    INNER JOIN alumno a 
    ON (at.codigo = a.codigo and a.estado = 1) 
WHERE at.cod_tut = ?
AND at.estado = 1;